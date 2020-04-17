
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

    const svgElement = $('<svg/>',{
        xmlns:'http://www.w3.org/2000/svg',
        'width': '20',
        'height': '20',
        'viewBox': "0 0 20 20",
        
        id: 'svgElement'+count
    });

    const upvotePathElement=  $('<path/>',{
        d: "M0,10 C-6.76353751e-16,4.4771525 4.4771525,1.01453063e-15 10,0 C15.5228475,-1.01453063e-15 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 6.76353751e-16,15.5228475 0,10 Z M10,18 C14.418278,18 18,14.418278 18,10 C18,5.581722 14.418278,2 10,2 C5.581722,2 2,5.581722 2,10 C2,14.418278 5.581722,18 10,18 Z M10.7,7.46 L14.25,11 L12.84,12.41 L10,9.6 L7.17,12.4 L5.76,11 L10,6.76 L10.7,7.46 Z"
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

    const footerSvgElement = $('<svg/>',{
        xmlns:'http://www.w3.org/2000/svg',
        'width': '2',
        'height': '2',
        'viewBox': "0 0 2 2",  
        id: 'footerSvgElement'+count
    });

    const dotCircleElement = $('<circle/>',{
        "cx":"204",
        "cy":"437",
        "r":"1",
        "fill":"#333",
        "fill-opacity":".7",
        "fill-rule":"evenodd",
        "transform":"translate(-203 -436)"  
    });

    const timeAgoFooterElement = $('<div/>',{
        class: "iTimeAgo",
        text: thread.formattedTimeAgo
    });

    const commentsLeftElement = $('<div/>',{
        class: "iComments",
        text: ""+thread.replyCount+ " Comments"
    });

    const enterDiscussionOuterElement = $('<a/>',{
        class: "enterDiscussion",
        href:"/view-thread/"+thread.postKey,
        text: "Enter Discussion",
        id:"discussionOuterElement"+count
    });




    outerMostParentElement.appendTo('#ideaList');
    innerTopElement.appendTo('#ideaListParent'+count);
    threadTitleElement.appendTo('#innerTopElement'+count);
    votingButtonElement.appendTo('#innerTopElement'+count);
    upvoteElement.appendTo('#votingButtonElement'+count);
    svgElement.appendTo('#upvoteElement'+count);
    upvotePathElement.appendTo('#svgElement'+count);
    upvoteScoreElement.appendTo('#innerTopElement'+count);
    threadBodyElement.appendTo("#ideaListParent"+count);

    footerMainElement.appendTo("#ideaListParent"+count);
    subFooterElement.appendTo('#footerMainElement'+count);
    footerImageElement.appendTo("#subFooterElement"+count);
    authorFooterElement.appendTo("#subFooterElement"+count);
    dotFooterFirstElement.appendTo("#subFooterElement"+count);
    footerSvgElement.appendTo("#footerDotFirst"+count);
    dotCircleElement.appendTo('#footerSvgElement'+count);
    timeAgoFooterElement.appendTo("#subFooterElement"+count);
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