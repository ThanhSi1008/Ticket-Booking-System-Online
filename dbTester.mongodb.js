use("cinema");
// Lấy giá của screenings
db.screenings.aggregate([
  {
    $lookup: {
      from: "price",
      let: { screeningPrice: "$price_per_ticket" },
      pipeline: [
        {
          $unwind: "$price_details",
        },
        {
          $match: {
            $expr: {
              $eq: ["$price_details.price", "$$screeningPrice"],
            },
            active: true,
          },
        },
        {
          $project: {
            _id: 0,
            price_details: 1,
          },
        },
      ],
      as: "price_details",
    },
  },
]);

// Lấy danh sách giá của product
db.price.aggregate([
  {
    $unwind: "$price_details", // Giải nén phần tử trong mảng price_details
  },
  {
    $lookup: {
      from: "products", // Tên collection chứa các sản phẩm
      localField: "price_details.item._id", // Liên kết với _id của item trong price_details
      foreignField: "_id", // Khớp với _id trong bảng products
      as: "product_info", // Lưu thông tin sản phẩm vào trường product_info
    },
  },
  {
    $unwind: "$product_info", // Giải nén sản phẩm từ trường product_info
  },
  {
    $group: {
      _id: "$product_info.name", // Nhóm theo tên sản phẩm
      prices: { $push: "$price_details.price" }, // Tạo mảng giá của sản phẩm
    },
  },
  {
    $project: {
      name: "$_id", // Đổi tên trường _id thành name
      prices: 1, // Giữ lại mảng prices
    },
  },
]);

// Lấy giá đang được active của product
db.price.aggregate([
  {
    $match: { active: true },
  },
  {
    $unwind: "$price_details", // Giải nén phần tử trong mảng price_details
  },
  {
    $lookup: {
      from: "products", // Tên collection chứa các sản phẩm
      localField: "price_details.item._id", // Liên kết với _id của item trong price_details
      foreignField: "_id", // Khớp với _id trong bảng products
      as: "product_info", // Lưu thông tin sản phẩm vào trường product_info
    },
  },
  {
    $unwind: "$product_info", // Giải nén sản phẩm từ trường product_info
  },
  {
    $project: {
      "product_info.name": 1, // Lấy tên sản phẩm
      "price_details.price": 1, // Lấy giá của sản phẩm từ price_details
    },
  },
]);
