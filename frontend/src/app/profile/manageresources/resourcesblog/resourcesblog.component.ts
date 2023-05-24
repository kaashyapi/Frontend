import { Component } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBlogDialogComponent } from 'src/app/admin/admin-manage-resources/delete-blog-dialog/delete-blog-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Blog } from 'src/app/model/blog';


@Component({
  selector: 'app-resourcesblog',
  templateUrl: './resourcesblog.component.html',
  styleUrls: ['./resourcesblog.component.css'],
})
export class ResourcesblogComponent {
  blog: any[] = [];
  allblogs: any;

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService,
    private ngxLoader: NgxUiLoaderService
  ) {}
 
  
    blogs: Blog = {
      _id: '',
    title: '',
    content: '',
    createdDate: new Date(),
    updatedDate: new Date(),
    isApproved: new Boolean(),
    userId:'',
    user:
    {
      firstName: '',
      lastName: '',
    },
    };

  

  ngOnInit(): void {
    this.ngxLoader.start();
    const id: any = localStorage.getItem('userId');
    this.profileService.getUserBlogById(id).subscribe(
      (res: any) => {
        this.blog = res.data;
        this.ngxLoader.stop();
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
