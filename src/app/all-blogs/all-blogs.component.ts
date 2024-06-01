
import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service';
import { LikeDislikeService } from '../services/like-dislike.service';
import { CommentServiceService } from '../services/comment-service.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {
  blogs: any;
  userId: any;
  likeCounts: { [key: number]: number } = {};
  dislikeCounts: { [key: number]: number } = {};
  comments: { [key: number]: any[] } = {};
  newComment: { [key: number]: string } = {};

  constructor(
    private blogservice: BlogServiceService,
    private likeDislikeservice: LikeDislikeService,
    private commentService: CommentServiceService
  ) { }

  ngOnInit(): void {
    this.blogservice.getAllBlogs().subscribe(
      (blogs: any[]) => {
        this.blogs = blogs;
        blogs.forEach(blog => {
          this.fetchLikeDislikeCounts(blog.id);
          this.fetchComments(blog.id);
        });
      },
      error => {
        console.error('Error fetching blogs:', error);
      }
    );

    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);
    this.userId = userData?.id;
  }

  fetchLikeDislikeCounts(postId: any) {
    this.likeDislikeservice.likeCount(postId, true).subscribe((res: any) => {
      this.likeCounts[postId] = res.length;
    });
    this.likeDislikeservice.likeCount(postId, false).subscribe((res: any) => {
      this.dislikeCounts[postId] = res.length;
    });
  }

  likeToTheBlog(postId: any) {
    const body = {
      userId: this.userId,
      postId: postId
    };
    this.likeDislikeservice.like(body).subscribe(() => {
      this.fetchLikeDislikeCounts(postId);
    });
  }

  dislikeToTheBlog(postId: any) {
    const body = {
      userId: this.userId,
      postId: postId
    };
    this.likeDislikeservice.dislike(body).subscribe(() => {
      this.fetchLikeDislikeCounts(postId);
    });
  }

  fetchComments(postId: any) {
    this.commentService.getComments(postId).subscribe((comments: any[]) => {
      this.comments[postId] = comments;
    });
  }

  addComment(postId: any) {
    const comment = {
      userId: this.userId,
      postId: postId,
      comment: this.newComment[postId],
    };
    this.commentService.addComment(comment).subscribe((newComment: any) => {
      this.comments[postId].push(newComment);
      this.newComment[postId] = ''; // Clear the input field
    });
  }
}
