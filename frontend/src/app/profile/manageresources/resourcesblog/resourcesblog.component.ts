import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBlogDialogComponent } from 'src/app/admin/admin-manage-resources/delete-blog-dialog/delete-blog-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Blog } from 'src/app/model/blog';

export interface tags {
  name: string;
}

@Component({
  selector: 'app-resourcesblog',
  templateUrl: './resourcesblog.component.html',
  styleUrls: ['./resourcesblog.component.css'],
})
export class ResourcesblogComponent {
  blog: any[] = [];
  updateD: any;
  allblogs: Blog[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private profileService: ProfileService,
    private ngxLoader: NgxUiLoaderService
  ) {}
 
  
    pro: Blog = {
      blogId: '',
      blogTitle: '',
      blogContent: '',
      createdDate: new Date(),
      updatedDate: new Date(),
      userId : '',
      name:''
    };

  

  ngOnInit(): void {
    this.ngxLoader.start();
    const userId: any = localStorage.getItem('userId');    
    this.profileService.getUserBlogById(userId).subscribe(
      (response: any) => {
        if (response && response.body) {
          const responseBody = JSON.parse(response.body);
          if (responseBody && Array.isArray(responseBody.blogs)) {
            this.allblogs = responseBody.blogs;
            this.ngxLoader.stop();
          } else {
            console.log('Invalid response format:', responseBody);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteBlogDialog(_id: any): void {
    const dialogRef = this.dialog.open(DeleteBlogDialogComponent, {
      width: 'auto',
      data: _id,
      disableClose: true,
    });
  }
}
