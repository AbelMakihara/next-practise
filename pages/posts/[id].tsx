import { useRouter, withRouter } from "next/router";
import { server } from "@/config";
import { useState } from "react";

// ...

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  // const res = await fetch(`${server}/api/getPostId`);
  // const posts = await res.json();

  // // Get the paths we want to pre-render based on posts
  // const paths = posts?.data.map((id: any) => ({
  //   params: { id: id.toString() },
  // }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths: [1, 2, 3].map((id) => ({
      params: { id: id.toString() },
    })),
    fallback: false,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }: { params: any }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`${server}/api/getPostById?id=${params.id}`);
  // const { data: post } = await res.json();

  // Pass post data to the page via props
  return { props: { id: params.id } };
}

const Post = (props: any) => {
  // const router = useRouter();
  const [post, setPost] = useState("");
  // const { id } = router.query;

  const queryContent = async () => {
    const res = await fetch(`${server}/api/getPostById?id=${props.id}`);
    const { data } = await res.json();
    setPost(data);
  };
  return (
    <>
      <div onClick={queryContent}>get</div>
      <p>Post: {props.id}</p>
      <p>Content: {post}</p>
    </>
  );
};

export default Post;
