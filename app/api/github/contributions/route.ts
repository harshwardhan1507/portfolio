import { NextResponse } from 'next/server';

export async function GET() {
  const username = 'harshwardhan1507';
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN is not set' }, { status: 500 });
  }

  const query = `
    query($userName:String!) {
      user(login: $userName){
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { userName: username },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch contributions');
    }

    const json = await res.json();
    if (json.errors) {
      throw new Error('GraphQL Error');
    }

    const calendar = json.data.user.contributionsCollection.contributionCalendar;

    // Flattening the weeks so it returns an array of days or keeping weeks structure.
    // The prompt says "weeks (array of days with date, contributionCount, color)"
    const weeks = calendar.weeks.map((week: any) => week.contributionDays);

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      weeks: weeks,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch GitHub contributions' }, { status: 500 });
  }
}
