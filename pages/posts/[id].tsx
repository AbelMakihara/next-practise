import { useRouter, withRouter } from "next/router";
import { server } from "@/config";

// ...

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${server}/api/getPostId`);
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts?.data.map((id:any) => ({
    params: { id: id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: { params: any }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`${server}/api/getPostById?id=${params.id}`);
  const { data: post } = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}

const Post = (props: any) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <p>Post: {id}</p>
      <p>Content: {props.post}</p>
    </>
  );
};

export default Post;
