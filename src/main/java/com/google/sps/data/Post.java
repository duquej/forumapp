package com.google.sps.data;

import java.util.ArrayList;


public abstract class Post {

  private String post;
  private String accountUsername;
  private int upvotes;
  private long timeSubmitted;
  private ArrayList<Long> keyReplies;

  public Post(String post, String accountUsername, int upvotes, long timeSubmitted){
      this.post = post;
      this.accountUsername = accountUsername;
      this.upvotes = upvotes;
      this.timeSubmitted = timeSubmitted;
  }

  public void addCommentKey(long replyKey){
      keyReplies.add(replyKey);
  }

  public ArrayList<Long> getKeyComments(){
      return keyReplies;
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
