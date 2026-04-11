import { NextResponse } from 'next/server';

export async function GET() {
  const username = 'harshwardhan1507';
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN is not set' }, { status: 500 });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, { 
      headers,
      next: { revalidate: 3600 }
    });
    if (!userRes.ok) throw new Error('Failed to fetch user');
    const user = await userRes.json();

    let allRepos: any[] = [];
    let page = 1;
    while (true) {
      const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`, { 
        headers,
        next: { revalidate: 3600 }
      });
      if (!repoRes.ok) break;
      const repos = await repoRes.json();
      if (repos.length === 0) break;
      allRepos = allRepos.concat(repos);
      if (repos.length < 100) break;
      page++;
    }

    const totalStars = allRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = allRepos.reduce((acc, repo) => acc + repo.forks_count, 0);

    const recentRepos = [...allRepos]
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 6);

    return NextResponse.json({
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      publicGists: user.public_gists,
      totalStars,
      totalForks,
      recentRepos,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 });
  }
}
