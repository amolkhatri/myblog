import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'react-markdown';

export async function generateStaticParams() {
    const files = fs.readdirSync('app/markdowns');
    const paths = files.map((file) => ({
        params: { name: file.replace('.md', '') },
    }));
    return paths.map((path) => ({
        name: path.params.name,
    }));
}

export default async function BlogPage({params}) {
    let {name} = (await params);
    const file = fs.readFileSync(`app/markdowns/${name}.md`, 'utf8');
    const {content, data} = matter(file);
    return (
        <div className="bg-white">
            <h1>{data.title}</h1>
            <Markdown  className="markdown p-8 text-black">{content}</Markdown>
        </div>
    )
}