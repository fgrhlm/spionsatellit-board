import IComment from "./IComment";

interface IPost {
  _id: string,
  title: string,
  body: string,
  comments: IComment[],
  createdAt?: Date,
  _v: number
}

export default IPost