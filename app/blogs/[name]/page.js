import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'react-markdown';

export async function getStaticPaths() {
    const files = fs.readdirSync('app/markdowns');
    const paths = files.map((file) => ({
        params: { name: file.replace('.md', '') },
    }));
    return {
        paths,
        fallback: false,
    };
}

export default async function BlogPage({params}) {
    let {name} = (await params);
    const file = fs.readFileSync(`app/markdowns/${name}.md`, 'utf8');
    const {content, data} = matter(file);
    return (
        <div>
            <h1>{data.title}</h1>
            <Markdown >{content}</Markdown>
        </div>
    )
}