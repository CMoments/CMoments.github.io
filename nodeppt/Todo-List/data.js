function getData() {
    // data for tasks
    const tasks = [
        // data for tasks of the "widgets" project
        { "id": "widgets", "project": "widgets", "text": "\u{1F389} DHTMLX widgets" },
        { "id": "gantt", "project": "widgets", "parent": "widgets", "text": "Gantt" },
        { "id": "scheduler", "project": "widgets", "parent": "widgets", "text": "Scheduler" },
        { "id": "diagram", "project": "widgets", "parent": "widgets", "text": "Diagram" },
        
        // data for tasks of the "introduction" project    
        {
            "id": "1",
            "project": "introduction",
            "text": "Greetings, everyone! \u{1F44B} \n Welcome to our Todo-List for QEC\u{1F389} \n",
			"checked": false
		},

		
    ];

    // data for users
	const users = [
		{ "id": "user_3", "label": "Shi suhuan", "avatar": "./Shi.png" },
        { "id": "user_1", "label": "Dong haixuan", "avatar": "./Dong.png" },
        { "id": "user_2", "label": "Zhang yuehan", "avatar": "./Zhang.png" },
		{ "id": "user_4", "label": "Liu fuxuan", "avatar": "./Liu.png" },
        // more user objects
    ];

    // data for projects
    const projects = [
		{ "id": "introduction", "label": "Introduction to QEC teamwork proactive" },
  
		// { "id": "widgets", "label": "Our widgets" },
    ];
	const priorities = [
	    {
	        id: 1,
	        label: "Critical",
			color: "#f33",
	    },
		{
	        id: 2,
	        label: "Major",
			color: "rgba(255, 225, 0, 1)",
	    },
	];

    return { projects, users, tasks, priorities};
}