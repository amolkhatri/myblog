import Image from "next/image";

export default function Home() {
  const blogPosts = [
    {
      title: "Understanding React",
      description: "A deep dive into React and its ecosystem.",
      image: "/react.svg",
      link: "/blog/understanding-react",
    },
    {
      title: "Next.js for Beginners",
      description: "Learn the basics of Next.js and how to get started.",
      image: "/next.svg",
      link: "/blog/nextjs-for-beginners",
    },
    // Add more blog posts here
  ];

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
              src={post.image}
              alt={post.title}
              width={400}
              height={200}
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.description}</p>
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
