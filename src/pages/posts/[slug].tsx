import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Layout from '@/containers/Layout';
import { getPostBySlug, getAllPosts } from '@/lib/renderPosts';
import Head from 'next/head';
import markdownToHtml from '@/lib/mdToHtml';

interface IPost {
  title?: string;
  content?: string;
  ogImage?: { url: string };
  slug?: string;
}

export default function Post({ post }: { post: IPost }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    // <Layout preview={preview}>
    <Layout>
      <>
        {router.isFallback ? (
          <h1>Cargando…</h1>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.title}</title>
                <meta property="og:image" content={post?.ogImage?.url} />
              </Head>
              {/* <PostHeader
                            title={post.title}
                            coverImage={post.coverImage}
                            date={post.date}
                            author={post.author}
                        /> */}
              <div
                dangerouslySetInnerHTML={{ __html: post.content as string }}
              ></div>
            </article>
          </>
        )}
      </>
    </Layout>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, [
    `title`,
    `date`,
    `slug`,
    `author`,
    `content`,
    `ogImage`,
    `coverImage`,
  ]);
  const content = await markdownToHtml(post.content || ``);

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts([`slug`]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
