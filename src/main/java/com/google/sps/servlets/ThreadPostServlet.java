// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;


/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/post-thread")
public class ThreadPostServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;");
        response.getWriter().println("<h1>Hello world!</h1>");
    }
  
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        UserService userService = UserServiceFactory.getUserService();
        if (!userService.isUserLoggedIn()) {
            response.sendRedirect("/index.html");
            return;  //send back custom error 
        }

        String threadTitle = request.getParameter("threadTitle");
        String threadBodyText = request.getParameter("bodyText");
        String userEmail = userService.getCurrentUser().getEmail();
        String threadStringKeyGenerated = storeThreadToDatabase(threadTitle, threadBodyText, userEmail);

        //response.sendRedirect("/thread.html?t="+threadStringKeyGenerated);
        String url = "/thread.html?t="+threadStringKeyGenerated;
        String json = "{ \"redirect\" : \""+ url +"\" }";
        response.setContentType("application/json;");
        response.getWriter().println(json);




    }

    private String storeThreadToDatabase(String threadTitle, String threadBody, String userEmail){
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Key threadKeyGenerated = datastore.allocateIds("Thread", 1).getStart();

        Entity threadEntity = new Entity(threadKeyGenerated);
        threadEntity.setProperty("title",threadTitle);
        threadEntity.setProperty("body",threadBody);
        threadEntity.setProperty("upvotes",0);

        ArrayList<String> keys = new ArrayList<String>();
        threadEntity.setProperty("replyKeys", keys);

        threadEntity.setProperty("replyCount",0);
        threadEntity.setProperty("timeSubmitted",System.currentTimeMillis());

        threadEntity.setProperty("accountEmail",userEmail);
        datastore.put(threadEntity);

        return KeyFactory.keyToString(threadKeyGenerated);


    }


  
}
