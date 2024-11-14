use("cinema");
db.movies.updateOne(
  { _id: ObjectId("67350b3224415fffe6f46244") }, // Tìm kiếm theo _id của phim
  {
    $push: {
      casts: {
        $each: [
          {
            person_name: "Michelle Williams",
            avatar:
              "https://res.cloudinary.com/dlrtv3tla/image/upload/v1731542135/Michelle_Williams.jpg",
            character_name: "Anne Weying",
          },
          {
            person_name: "Woody Harrelson",
            avatar:
              "https://res.cloudinary.com/dlrtv3tla/image/upload/v1731542135/Woody_Harrelson.jpg",
            character_name: "Cletus Kasady",
          },
          {
            person_name: "Naomie Harris",
            avatar:
              "https://res.cloudinary.com/dlrtv3tla/image/upload/v1731542135/Naomie_Harris.jpg",
            character_name: "Shriek",
          },
          {
            person_name: "Reed Scott",
            avatar:
              "https://res.cloudinary.com/dlrtv3tla/image/upload/v1731542135/Reed_Scott.jpg",
            character_name: "Dan Lewis",
          },
        ],
      },
    },
  }
);

db.movies.find();
db.movies.insertMany([
  {
    movie_name: "Joker: Folie à Deux",
    duration: 120, // Example duration
    description:
      "Sequel to the acclaimed Joker, exploring deeper into the psyche of Arthur Fleck.",
    genre: "Musical/Thriller",
    language: "English",
    trailer_link: "https://www.youtube.com/watch?v=joker2_trailer",
    release_date: new Date("2024-04-02T00:00:00Z"),
    movie_poster: "https://example.com/joker.jpg",
    casts: [
      {
        person_id: ObjectId("6733dff91752e9c078ee92f5"),
        person_name: "Joaquin Phoenix",
        avatar: "https://link-to-joaquin-avatar.com",
        character_name: "Arthur Fleck",
      },
      {
        person_id: ObjectId("6733dff91752e9c078ee92f6"),
        person_name: "Lady Gaga",
        avatar: "https://link-to-lady-gaga-avatar.com",
        character_name: "Harleen Quinzel",
      },
    ],
  },
  {
    movie_name: "Venom: The Last Dance",
    duration: 130,
    description: "Venom returns for a final showdown.",
    genre: "Action/Sci-fi",
    language: "English",
    trailer_link: "https://www.youtube.com/watch?v=venom2_trailer",
    release_date: new Date("2024-05-15T00:00:00Z"),
    movie_poster: "https://example.com/venom.jpg",
    casts: [
      {
        person_id: ObjectId("6733dff91752e9c078ee92f7"),
        person_name: "Tom Hardy",
        avatar: "https://link-to-tom-avatar.com",
        character_name: "Eddie Brock",
      },
    ],
  },
  {
    movie_name: "Inside Out",
    duration: 102,
    description:
      "A look inside the emotions of a young girl as she navigates a new city and school.",
    genre: "Family/Comedy",
    language: "English",
    trailer_link: "https://www.youtube.com/watch?v=insideout_trailer",
    release_date: new Date("2015-06-19T00:00:00Z"),
    movie_poster: "https://example.com/inside-out.jpg",
    casts: [
      {
        person_id: ObjectId("6733dff91752e9c078ee92f8"),
        person_name: "Amy Poehler",
        avatar: "https://link-to-amy-avatar.com",
        character_name: "Joy",
      },
    ],
  },
  {
    movie_name: "Avatar: The Way of Water",
    duration: 190,
    description:
      "The epic sequel to Avatar, exploring new depths of Pandora’s oceans.",
    genre: "Action/Sci-fi",
    language: "English",
    trailer_link: "https://www.youtube.com/watch?v=avatar2_trailer",
    release_date: new Date("2022-12-16T00:00:00Z"),
    movie_poster: "https://example.com/avatar.jpg",
    casts: [
      {
        person_id: ObjectId("6733dff91752e9c078ee92f9"),
        person_name: "Sam Worthington",
        avatar: "https://link-to-sam-avatar.com",
        character_name: "Jake Sully",
      },
    ],
  },
  {
    movie_name: "Interstellar",
    duration: 169,
    description:
      "A team of explorers travels through a wormhole in space in an attempt to ensure humanity’s survival.",
    genre: "Sci-Fi/Adventure",
    language: "English",
    trailer_link: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    release_date: new Date("2014-11-07T00:00:00Z"),
    movie_poster:
      "https://res.cloudinary.com/dlrtv3tla/image/upload/v1731529133/image_23_hcabgd.png",
    casts: [
      {
        person_id: ObjectId("6733dff91752e9c078ee92f2"),
        person_name: "Matthew McConaughey",
        avatar: "https://link-to-matthew-avatar.com",
        character_name: "Cooper",
      },
      {
        person_id: ObjectId("6733dff91752e9c078ee92f3"),
        person_name: "Anne Hathaway",
        avatar: "https://link-to-anne-avatar.com",
        character_name: "Brand",
      },
    ],
  },
  {
    movie_name: "Spider-Man: No Way Home",
    duration: 148,
    description:
      "Peter Parker’s identity is revealed, bringing his superhero responsibilities into conflict.",
    genre: "Action/Sci-fi",
    language: "English",
    trailer_link: "https://www.youtube.com/watch?v=spiderman_trailer",
    release_date: new Date("2021-12-17T00:00:00Z"),
    movie_poster: "https://example.com/spiderman.jpg",
    casts: [
      {
        person_id: ObjectId("6733dff91752e9c078ee92f0"),
        person_name: "Tom Holland",
        avatar: "https://link-to-tom-holland-avatar.com",
        character_name: "Spider-Man",
      },
    ],
  },
]);

db.movies.findOne();
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
