import { instance as axios } from "../http-common";

export default {
  getPuzzle,
};

// gets puzzle from API generator based on difficulty
async function getPuzzle(difficulty: string): Promise<any> {
  try {
    const res = await axios.get(`/generate?difficulty=${difficulty}`);
    if (res.status === 200 && res.data) {
      return res.data;
    }
  } catch (error) {
    return { success: false, msg: "Unable to fetch puzzle board." };
  }
}
