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
    };
  });

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        <p className="text-lg text-gray-600">Explore our latest articles</p>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              className="w-full h-48 object-cover"
              src={post.image || '/default-image.svg'}
              alt={post.title}
              width={400}
              height={200}
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <a
                href={post.link}
                className="text-blue-500 hover:underline"
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
