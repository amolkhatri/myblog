import Image from "next/image";
import fs from 'fs';
import matter from 'gray-matter';

export default function Home() {
  const files = fs.readdirSync('app/markdowns');
  const blogPosts = files.map((file) => {
    let fl = fs.readFileSync(`app/markdowns/${file}`, 'utf8');
    let { data } = matter(fl);

    return {
      title: data.title,
      link: `/myblog/blogs/${file.replace('.md', '')}`,
      author: data.author || 'John Doe',
      date: data.date || '2023-01-01',
      tags: data.tags || ['JavaScript', 'React'],
    };
  });

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-mono bg-gradient-to-b from-white to-purple-50 text-purple-900">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold text-purple-800">Developer Blog</h1>
        <p className="text-lg text-purple-600">Insights and tutorials from the tech world</p>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-purple-100 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <Image
              className="w-full h-48 object-cover"
              src={post.image || '/default-image.svg'}
              alt={post.title}
              width={400}
              height={200}
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-purple-800">{post.title}</h2>
              <p className="text-sm text-purple-600">By {post.author} on {post.date}</p>
              <div className="flex flex-wrap mt-2 mb-4">
                {post.tags.map((tag, i) => (
                  <span key={i} className="bg-purple-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={post.link}
                className="text-purple-500 hover:underline hover:text-purple-700 transition duration-200"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
