// import { Component, OnInit } from '@angular/core';
// import { BlogServiceService } from '../services/blog-service.service';
// import { LikeDislikeService } from '../services/like-dislike.service';

// @Component({
//   selector: 'app-all-blogs',
//   templateUrl: './all-blogs.component.html',
//   styleUrls: ['./all-blogs.component.css']
// })
// export class AllBlogsComponent implements OnInit {
//   blogs:any;
//   userId:any;
//   constructor(private blogservice:BlogServiceService,private likeDislikeservice:LikeDislikeService) { }
//   ngOnInit(): void {
//     this.blogservice.getAllBlogs()
//     .subscribe(
//       (blogs: string[]) => {
//         this.blogs = blogs;
//         console.log(blogs);
//       },
//       error => {
//         console.error('Error fetching images:', error);
//       }
//     );
//     let userStore=localStorage.getItem('user');
//     console.log(userStore);
//     let userData=userStore&&JSON.parse(userStore);
//     console.log(userData);
//     this.userId=userData.id;
//   }
//   totalLikes:any;
//   totalDislikes:any;
//   NumberOfLikes(postId:any)
//   {
//     this.likeDislikeservice.likeCount(postId).subscribe((res)=>
//     {
//       this.totalLikes=res.length;
//     });
//   }
//   NumberOfDislikes(postId:any)
//   {
//     this.likeDislikeservice.likeCount(postId).subscribe((res)=>{
//       this.totalDislikes=res.length;
//     });
//   }
//   likeToTheBlog(postId:any)
//   {
//     const body={
//       userId:this.userId,
//       postId:postId
//     }
//     this.likeDislikeservice.like(body);
//   }

//   dislikeToTheBlog(postId:any)
//   {
//     const body={
//       userId:this.userId,
//       postId:postId
//     }
//     this.likeDislikeservice.dislike(body);
//   }

// }
// import { Component, OnInit } from '@angular/core';
// import { BlogServiceService } from '../services/blog-service.service';
// import { LikeDislikeService } from '../services/like-dislike.service';

// @Component({
//   selector: 'app-all-blogs',
//   templateUrl: './all-blogs.component.html',
//   styleUrls: ['./all-blogs.component.css']
// })
// export class AllBlogsComponent implements OnInit {
//   blogs: any;
//   userId: any;
//   likeCounts: { [key: number]: number } = {};
//   dislikeCounts: { [key: number]: number } = {};

//   constructor(private blogservice: BlogServiceService, private likeDislikeservice: LikeDislikeService) { }

//   ngOnInit(): void {
//     this.blogservice.getAllBlogs()
//       .subscribe(
//         (blogs: any[]) => {
//           this.blogs = blogs;
//           blogs.forEach(blog => {
//             this.fetchLikeDislikeCounts(blog.id);
//           });
//         },
//         error => {
//           console.error('Error fetching blogs:', error);
//         }
//       );

//     let userStore = localStorage.getItem('user');
//     let userData = userStore && JSON.parse(userStore);
//     this.userId = userData?.id;
//   }

//   fetchLikeDislikeCounts(postId: any) {
//     this.likeDislikeservice.likeCount(postId, true).subscribe((res: any) => {
//       this.likeCounts[postId] = res.length;
//     });
//     this.likeDislikeservice.likeCount(postId, false).subscribe((res: any) => {
//       this.dislikeCounts[postId] = res.length;
//     });
//   }

//   likeToTheBlog(postId: any) {
//     const body = {
//       userId: this.userId,
//       postId: postId
//     };
//     this.likeDislikeservice.like(body).subscribe(() => {
//       this.fetchLikeDislikeCounts(postId);
//     });
//   }

//   dislikeToTheBlog(postId: any) {
//     const body = {
//       userId: this.userId,
//       postId: postId
//     };
//     this.likeDislikeservice.dislike(body).subscribe(() => {
//       this.fetchLikeDislikeCounts(postId);
//     });
//   }
// }

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
    this.blogservice.getAllBlogs()
      .subscribe(
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

    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
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
      comment: this.newComment[postId]
    };
    this.commentService.addComment(comment).subscribe((newComment: any) => {
      this.comments[postId].push(newComment);
      this.newComment[postId] = ''; // Clear the input field
    });
  }
}
