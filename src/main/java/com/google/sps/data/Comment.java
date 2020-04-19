package com.google.sps.data;

import java.util.Date;
import java.util.ArrayList;
import com.google.appengine.api.datastore.Key;



public class Comment extends Post{
  private String threadKey;

  public Comment(String comment, String accountUsername, long timeSubmitted, long upvotes, ArrayList<Comment> keyReplies, long replyCount, String postKey, String threadKey, String formattedTimeAgo){
      super(comment,accountUsername,upvotes,timeSubmitted,keyReplies,replyCount,postKey,formattedTimeAgo);
      this.threadKey = threadKey;
  }

}


