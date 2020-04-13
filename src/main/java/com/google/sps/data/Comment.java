package com.google.sps.data;

import java.util.Date;
import java.util.ArrayList;


public class Comment extends Post{

  public Comment(String comment, String accountUsername, long timeSubmitted, int upvotes){
      super(comment,accountUsername,upvotes,timeSubmitted);
  }

}


