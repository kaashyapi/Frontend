import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogService } from 'src/app/service/blog.service';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  deleteblog: any;
  public questionId: any;
  public answerId: any;
  public dynamic: string = 'User';

  constructor(
    private Admin: AdminService,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('ID :', this.data.questionId);
    if (this.data.questionId) {
      this.dynamic = 'Question';
    } else if (this.data.answerId) {
      this.dynamic = 'Answer';
    }
  }

  deleteUser(userId: string) {
    this.Admin.deleteUser(userId).subscribe(
      (response) => {
        this.ngxLoader.start();
        this.dialogRef.close();
        this.ngxLoader.stop();
        this.snackBar.open('User Deleted!', 'Dismiss', commonSnackBarConfig);
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this.ngxLoader.stop();
        this.snackBar.open(
          error.error.message,
          'Dismiss',
          commonSnackBarConfig
        );
      }
    );
  }

  deleteQuestion(questionId: any) {
    this.questionId = questionId;
    console.log('QuestionID: ', this.questionId);

    this.Admin.deleteQuestion(this.questionId).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close();
        this.snackBar.open(
          'Question Deleted!',
          'Dismiss',
          commonSnackBarConfig
        );
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this.snackBar.open(
          error.error.message,
          'Dismiss',
          commonSnackBarConfig
        );
      }
    );
  }

  deleteAnswer(answerId: any) {
    this.answerId = answerId;
    console.log('AnswerID: ', this.answerId);

    this.Admin.deleteAnswer(this.answerId).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close();
        this.snackBar.open('Answer Deleted!', 'Dismiss', commonSnackBarConfig);
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this.snackBar.open(
          error.error.message,
          'Dismiss',
          commonSnackBarConfig
        );
      }
    );
  }

  // delete the value

  userdelete(data: any) {
    console.log('Data : ', data);

    if (this.data.questionId) {
      this.deleteQuestion(data.questionId);
    } else if (this.data.answerId) {
      this.deleteAnswer(data.answerId);
    } else {
      this.deleteUser(data.userId);
    }
  }
}
