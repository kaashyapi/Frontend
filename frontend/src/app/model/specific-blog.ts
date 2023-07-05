// export interface SpecificBlog {
//   _id: string;
//   title: string;
//   content: string;
//   createdDate: Date;
//   isApproved: Boolean;
//   userId: {
//     firstName: string;
//     lastName: string;
//   };
// }


export interface SpecificBlog {
  blogId: string;
  blogTitle: string;
  blogContent: string;
  createdDate: string;
  updatedDate: string;
  name:string
}
