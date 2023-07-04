import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog } from '../model/blog';
import { SpecificBlog } from '../model/specific-blog';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //get all documents
  //get all documents
  getAllBlogs(pageNumber: number, pageSize: number): Observable<Blog[]> {
    return this.http
      .get<any>(
        `${this.baseUrl}/users/blogs?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getAllAdminBlogs(pageNumber: number, pageSize: number): Observable<Blog[]> {
    return this.http
      .get<Blog[]>(
        `${this.baseUrl}/admin/blog?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  //post a blog
  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.baseUrl}/users/addblog`, blog ).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  // get a specific blog
  getBlogById(blogId: string): Observable<SpecificBlog> {
    return this.http
      .get<SpecificBlog>(`${this.baseUrl}/users/blogs/` + blogId)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  //delete a specific blog
  deleteBlogById(id: string): Observable<Blog> {
    return this.http.delete<Blog>(`${this.baseUrl}/users/blogs/` + id).pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }

  //approve blog
  approveBlog(id: string): Observable<Blog> {
    const body = { isApproved: true };
    return this.http
      .patch<Blog>(`${this.baseUrl}/admin/approveblog/` + id, body)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
