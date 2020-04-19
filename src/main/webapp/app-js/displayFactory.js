
function createThreadElement(thread,count){
    const outerMostParentElement = $('<div/>',{
        class: 'ideaList__inner cursorOverride',
        id: 'ideaListParent'+count,
        'data-location': 'https://google.com'
    });

    const innerTopElement = $('<div/>',{
        class: 'ideaList__inner-top',
        id: 'innerTopElement'+count
    });

    const threadTitleElement = $('<h3/>',{
        class: 'ideaList__inner-top-title',
        text: thread.title
    })

    const votingButtonElement = $('<div/>',{
        class: 'votingButton',
        "data-upvote":"/api/ideas/5b5743c801e21300044b7289/heart",
        id: 'votingButtonElement'+count
    });

    const upvoteElement = $('<div/>',{
        class: 'iUpVoteIcon',
        id: 'upvoteElement'+count
    });

    
    const upvoteIconElement = $('<i/>',{
        class:"fa fa-arrow-up"
    });

    const upvoteScoreElement = $('<div/>',{
        class: "iUpVoteScore",
        text: thread.upvotes
    });

    const threadBodyElement = $('<div/>',{
        class: "iDesc",
        text: thread.post,
        id: "threadBodyElement"+count
    });

    const footerMainElement = $('<div/>',{
        class: "iFooter",
        id: "footerMainElement"+count
    });

    const subFooterElement = $('<div/>',{
        class: "iFooterA",
        id: "subFooterElement"+count
    });

    const footerImageElement = $('<img/>',{
        class: "iAuthorImg",
        src:"https://avatars.io/twitter/Jamesbrge",
        alt:"Author",
        id: "footerImageElement"+count
    });

    const authorFooterElement = $('<div/>',{
        class: "iAuthor",
        text: thread.accountUsername,
        id: "authorFooterElement"+count
    });

    const dotFooterFirstElement = $('<div/>',{
        class: "iDot",
        id: "footerDotFirst"+count
    });

     const footerCircleDotElement = $('<i/>',{
        class:"fa fa-circle",
        style:"font-size: 4px;"
    });

   
    const timeAgoFooterElement = $('<div/>',{
        class: "iTimeAgo",
        text: thread.formattedTimeAgo
    });

    const dotFooterSecondElement = $('<div/>',{
        class: "iDot",
        id: "footerDotSecond"+count
    });

    const footerSecondCircleDotElement = $('<i/>',{
        class:"fa fa-circle",
        style:"font-size: 4px;"
    });
    const commentsLeftElement = $('<div/>',{
        class: "iComments",
        text: ""+thread.replyCount+ " Comments"
    });

    const enterDiscussionOuterElement = $('<a/>',{
        class: "enterDiscussion",
        href:"/validate-thread/"+thread.postKey,
        text: "Enter Discussion",
        id:"discussionOuterElement"+count
    });




    outerMostParentElement.appendTo('#ideaList');
    innerTopElement.appendTo('#ideaListParent'+count);
    threadTitleElement.appendTo('#innerTopElement'+count);
    votingButtonElement.appendTo('#innerTopElement'+count);
    upvoteElement.appendTo('#votingButtonElement'+count);
    upvoteIconElement.appendTo('#upvoteElement'+count);
    upvoteScoreElement.appendTo('#innerTopElement'+count);
    threadBodyElement.appendTo("#ideaListParent"+count);

    footerMainElement.appendTo("#ideaListParent"+count);
    subFooterElement.appendTo('#footerMainElement'+count);
    footerImageElement.appendTo("#subFooterElement"+count);
    authorFooterElement.appendTo("#subFooterElement"+count);
    dotFooterFirstElement.appendTo("#subFooterElement"+count);
    footerCircleDotElement.appendTo("#footerDotFirst"+count);
    timeAgoFooterElement.appendTo("#subFooterElement"+count);
    dotFooterSecondElement.appendTo("#subFooterElement"+count);
    footerSecondCircleDotElement.appendTo("#footerDotSecond"+count);
    commentsLeftElement.appendTo("#subFooterElement"+count);
    enterDiscussionOuterElement.appendTo("#footerMainElement"+count);

    



    


}

async function getAllThreads(){
  const response = await fetch('/get-threads');
  const json = await response.json();
  contentElement = document.getElementById("ideaList");

  count=0;
  json.forEach((thread) => {
    createThreadElement(thread,count);
    count++;
  });

}