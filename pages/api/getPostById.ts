// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: String;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    data: `req.query.id${req.query.id}\n
  website_id	是	int		平台id
  category_id	是	int		分类id
  product_sort_data	是	array		排序商品数据
  product_sort_data.related_id	是	int		关联id
  product_sort_data.sort	是	int		排序值
  product_sort_data.rel_type	是	string		关联商品类型`,
  });
}
