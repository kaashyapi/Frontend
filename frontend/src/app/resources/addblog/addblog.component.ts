import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/service/blog.service';
import { Router } from '@angular/router';
import { Blog } from 'src/app/model/blog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';



@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css'],
})
export class AddblogComponent {

  userId:any = localStorage.getItem('userId');
  name:any = localStorage.getItem('name');
  public Editor = ClassicEditor;
  AddBlogForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(119),
      Validators.pattern('^[\\S]([\\wéáíóúñÑ,.:-¿?!() ])+$')
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.maxLength(1500),
    ]),
  });

  blogs: Blog = {
    blogId: '',
    blogTitle: '',
    blogContent: '',
    createdDate: new Date(),
    updatedDate: new Date(),
    userId :'',
    name:''
  };
  public title: any;
  public content: any;
  blogId: string = '';
  createdDate: Date = new Date();
  allblogs: Blog[] = [];

  constructor(
    private router: Router,
    private blogService: BlogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.title = this.blogs.blogTitle;
    this.content = this.blogs.blogContent;
  }

  get valide() {
    return this.AddBlogForm.controls;
  }
  createBlogData() {
    this.blogs.blogTitle = this.title;
    this.blogs.blogContent = this.content;
    this.userId;
    this.name;
    this.blogs.userId = this.userId
    this.blogs.name = this.name 
    console.log(this.userId)
    console.log(this.blogs);
    
    this.createdDate = new Date();
    this.blogService.createBlog(this.blogs).subscribe(
      (res) => {
        console.log(res);
        this.allblogs = [];
        this.ngOnInit();
        console.log("all blogs :", this.allblogs);
        
        this.snackBar.open(
          "Your blog will be posted after Admin's approval!!",
          'Dismiss',
          commonSnackBarConfig
        );
        this.router.navigate(['/resources']);
      },
      (err) => {
        console.log(err);
        console.log(this.blogs.blogContent);
        this.snackBar.open(
          'Sorry, cannot add this blog.Try a valid Blog!!',
          'Dismiss',
          commonSnackBarConfig
        );
      }
    );
  }
}
