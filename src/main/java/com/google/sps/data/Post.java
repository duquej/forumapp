package com.google.sps.data;

import java.util.ArrayList;


public abstract class Post {

  private String post;
  private String accountUsername;
  private int upvotes;
  private long timeSubmitted;
  private ArrayList<Comment> replies;

  public Post(String post, String accountUsername, int upvotes, long timeSubmitted){
      this.post = post;
      this.accountUsername = accountUsername;
      this.upvotes = upvotes;
      this.timeSubmitted = timeSubmitted;
  }

  public void addComment(Comment reply){
      replies.add(reply);
  }

  public ArrayList<Comment> getComments(){
      return replies;
  }

  public long getTimeSubmitted(){
      return timeSubmitted;
  }

  public void setTimeSubmitted(long timeSubmitted){
      this.timeSubmitted = timeSubmitted;
  }

  public void setPost(String post){
      this.post = post;
  }

  public String getPost(){
      return post;
  }

  public String getAuthor(){
      return accountUsername;
  }

  public int getUpvotes(){
      return upvotes;
  }

  public void setUpvotes(int upvotes){
      this.upvotes = upvotes;
  }

  public void addOneUpvote(){
      upvotes += 1;
  }

  public void subtractOneUpvote(){
      if (upvotes != 0){
          upvotes -= 1;
      }
  }
  




}
