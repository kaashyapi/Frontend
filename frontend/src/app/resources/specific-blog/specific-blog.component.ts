// import { Component, OnInit } from '@angular/core';

// import { BlogService } from 'src/app/service/blog.service';
// import { ActivatedRoute } from '@angular/router';
// import { UserRoleService } from 'src/app/service/user-role.service';
// import { SpecificBlog } from 'src/app/model/specific-blog';

// @Component({
//   selector: 'app-specific-blog',
//   templateUrl: './specific-blog.component.html',
//   styleUrls: ['./specific-blog.component.css'],
// })
// export class SpecificBlogComponent implements OnInit {
//   userId = localStorage.getItem('userId');
//   blogs: SpecificBlog = {
//     _id: '',
//     title: '',
//     content: '',
//     createdDate: new Date(),
//     isApproved: new Boolean(),
//     userId: {
//       firstName: '',
//       lastName: '',
//     },
//   };

//   title: string = '';
//   content: string = '';
//   createdDate: Date = new Date();

//   allblogs: SpecificBlog[] = [];

//   userRole: string;
//   public userid: any = localStorage.getItem('userId');
//   constructor(
//     private blogService: BlogService,
//     private activatedRoute: ActivatedRoute,
//     private userRoleService: UserRoleService
//   ) {}

//   ngOnInit(): void {
//     this.activatedRoute.paramMap.subscribe((params: any) => {
//       const bl: string = params.get('id');
//       this.blogService.getBlogById(bl!).subscribe(
//         (res) => {
//           this.blogs = res;
//           console.log();
//         },
//         (err) => {
//           console.log(err);
//         }
//       );
//     });

//     this.userRoleService.getUserRole(this.userid).subscribe(
//       (response) => {
//         this.userRole = response.userRole;
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';
import { UserRoleService } from 'src/app/service/user-role.service';
import { SpecificBlog } from 'src/app/model/specific-blog';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-specific-blog',
  templateUrl: './specific-blog.component.html',
  styleUrls: ['./specific-blog.component.css'],
})
export class SpecificBlogComponent implements OnInit {
  blog: SpecificBlog = {
    blogId: '',
    blogTitle: '',
    blogContent: '',
    createdDate: '',
    updatedDate: '',
    name:''
  };

  userRole: string;
  // userId: string = localStorage.getItem('userId');

  constructor(
    private router: Router,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private userRoleService: UserRoleService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      const blogId: string = params.get('id');
      this.blogService.getBlogById(blogId).subscribe(
        (response: any) => {
          const responseBody = JSON.parse(response.body);
          const blogData = responseBody.blog;
          this.blog = {
            blogId: blogData.blogId,
            blogTitle: blogData.blogTitle.S,
            blogContent: blogData.blogContent.S,
            createdDate: blogData.createdDate ? blogData.createdDate.S : '', 
            updatedDate: blogData.updatedDate ? blogData.updatedDate.S : '',
            name : blogData.name ? blogData.name.S : ''
          };
          console.log(this.blog);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  

    // this.userRoleService.getUserRole(this.userId).subscribe(
    //   (response) => {
    //     this.userRole = response.userRole;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
}
