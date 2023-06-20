import connectDb from "@/middleware/mongoose";
import News from "@/models/News";

export const getNewsByCategory = async (req, res) => {
  try {
    const { category, limit } = req.query;
    let query = News.find({ category }).sort({ createdAt: -1 });

    if (limit) {
      const parsedLimit = parseInt(limit);
      if (!isNaN(parsedLimit)) {
        query = query.limit(parsedLimit);
      }
    }

    const categoryNews = await query;
    res.json({ categoryNews });
  } catch (error) {
    res.status(200).json({ error: "Error" });
  }
};

export default connectDb(getNewsByCategory);
