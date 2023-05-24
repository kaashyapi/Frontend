import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminService } from 'src/app/service/admin.service';
import { DeleteDialogComponent } from '../admin-manage-users/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-admin-manage-forums',
  templateUrl: './admin-manage-forums.component.html',
  styleUrls: ['./admin-manage-forums.component.css'],
})
export class AdminManageForumsComponent {
  public allQuestions: any;
  constructor(
    private admin: AdminService,
    private ngxLoader: NgxUiLoaderService,
    public dialog: MatDialog
  ) {}

  getQuestions() {
    this.ngxLoader.start();
    this.admin.getQuestions().subscribe(
      (res) => {
        this.allQuestions = res.data;
        if (this.allQuestions) this.getAnswerById();
        console.log('Admin Side Question: ', res);
        this.ngxLoader.stop();
      },
      (error) => {
        console.log(error);
        this.ngxLoader.stop();
      }
    );
  }

  getAnswerById() {
    for (const question of this.allQuestions) {
      this.admin.getAnswerById(question._id).subscribe((res: any) => {
        question.answer = res.data === undefined ? { answer: '' } : res.data;
      });
    }
  }

  deleteQuestionDialog(questionId: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: 'auto',
      data: {questionId:questionId},
      disableClose: true,
    });
  }

  deleteAnswerDialog(answerId: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: 'auto',
      data: {answerId:answerId},
      disableClose: true,
    });
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  openDialog() {}
}
