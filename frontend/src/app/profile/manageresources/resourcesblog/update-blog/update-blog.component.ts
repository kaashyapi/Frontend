import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Blog } from 'src/app/model/blog';
import { updateDate } from 'src/app/model/updatedate';
import { BlogService } from 'src/app/service/blog.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css'],
})
export class UpdateBlogComponent {
  public userId = localStorage.getItem('userId');
  public Editor: any = ClassicEditor;
  public maxLength: number = 2000;

  public title: any;
  public content: any;

  UpdateBlogForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(119),
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.maxLength(1500),
    ]),
  });

  blog: Blog = {
    blogId: '',
    blogTitle: '',
    blogContent: '',
    createdDate: new Date(), 
    updatedDate: new Date(),
    userId : '',
    name:''
  };


  updateD:updateDate ={
  updatedDate: new Date,
  
}

updatedDate: Date = new Date()

  allblogs: Blog[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.title = this.blog.blogTitle;
    this.content = this.blog.blogContent;
    this.updatedDate = new Date();
    this.getBlogById(this.blog);
  }

  get valide() {
    return this.UpdateBlogForm.controls;
  }

  getBlogById(blog: Blog) {
    this.route.paramMap.subscribe((params: any) => {
      const bl: string = params.get('blogId');
      this.profileService.getBlogById(bl!).subscribe(
        (res) => {
          this.blog = res;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  
  editBlog(blog: Blog) {
    this.getBlogById(blog);
    this.title = blog.blogTitle;
    this.content = blog.blogContent;
    this.updatedDate = new Date();
  }

  updateBlog() {
    this.userId = this.userId;
    this.updatedDate = new Date();
    this.profileService.updateBlogs(this.blog).subscribe(
      (res) => {
        this.editBlog(this.blog);
        this.getBlogById(this.blog);
        console.log(res)

        this.router.navigate(['/manageresources']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
