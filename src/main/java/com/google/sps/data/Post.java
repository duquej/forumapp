package com.google.sps.data;

import java.util.ArrayList;
import com.google.appengine.api.datastore.Key;



public abstract class Post {

  private String post;
  private String accountUsername;
  private long upvotes;
  private long timeSubmitted;
  private ArrayList<Comment> keyReplies;
  private long replyCount;
  private String postKey;
  private String formattedTimeAgo;
  private ArrayList<String> peopleWhoUpvotedPost;


  public Post(String post, String accountUsername, long upvotes, long timeSubmitted,ArrayList<Comment> keyReplies, long replyCount, String postKey, String formattedTimeAgo, ArrayList<String> peopleWhoUpvotedPost){
      this.post = post;
      this.accountUsername = accountUsername;
      this.upvotes = upvotes;
      this.timeSubmitted = timeSubmitted;
      this.keyReplies = keyReplies;
      this.replyCount = replyCount;
      this.postKey = postKey;
      this.formattedTimeAgo = formattedTimeAgo;
      this.peopleWhoUpvotedPost = peopleWhoUpvotedPost;

  }

  public void addCommentKey(Comment replyKey){
      keyReplies.add(replyKey);
  }

  public ArrayList<Comment> getKeyComments(){
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

  public long getUpvotes(){
      return upvotes;
  }

  public void setUpvotes(long upvotes){
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
