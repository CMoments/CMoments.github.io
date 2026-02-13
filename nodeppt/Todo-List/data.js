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
            "text": "Greetings, everyone! \u{1F44B} \n Welcome to our Todo-List for CISCN2026 \u{1F389} \n",
			"checked": false
		},
		{
		    "id": "2",
		    "project": "introduction",
		    "text": "Note \u{1F6A8} \nThis is a static page,which means that your modification only take effect on your browser. \n A backend for our teamwork is on its way.",
		},
        {
            "id": "3",
            "project": "introduction",
            "text": "Todo-List功能：\n 你可以使用菜单为任务分配完成人和截止日期。",
            "assigned": [ "user_2", "user_1", "user_3" ],
            "due_date": "2033-03-08T21:00:00.000Z"
        },
        {
            "id": "4",
            "project": "introduction",
            "text": "Toolbar功能：\n 请在上边栏Toolbar中选择对应学习周的项目=> Learning Week1\u{1F929}",
        },
        {
            "id": "5",
            "project": "introduction",
            "parent": "4",
            "text": "Learning Week1",
            "checked": true
        },
        {
            "id": "6",
            "project": "introduction",
            "parent": "4",
            "text": "Learning Week2",
            "checked": false
        },
		{
			"id": "7",
			"project": "Learning Week1",
			"parent": "15",
			"text": "Introduction to Agentic AI\u{1F4D3} \n https://www.bilibili.com/video/BV1DfrdByE2H?spm_id_from=333.788.videopod.episodes&vd_source=b1e7090f559cd11184bba2cec638592d",
			"checked": false
		},
		{
			"id": "8",
			"project": "Learning Week1",
			"parent": "15",
			"text": "What is Agentic AI\u{1F4D3} \n https://www.bilibili.com/video/BV1DfrdByE2H?spm_id_from=333.788.videopod.episodes&vd_source=b1e7090f559cd11184bba2cec638592d&p=2",
			"checked": false
		},
		{
			"id": "9",
			"project": "Learning Week1",
			"parent": "15",
			"text": "Introduction to ClaudeCode \u{1F4D3} \n https://www.bilibili.com/video/BV19LSaBKE2S?spm_id_from=333.788.videopod.episodes&vd_source=b1e7090f559cd11184bba2cec638592d",
			"checked": false
		},
		{
			"id": "10",
			"project": "Learning Week1",
			"parent": "15",
			"text": "What is ClaudeCode \u{1F4D3} \nhttps://www.bilibili.com/video/BV19LSaBKE2S?spm_id_from=333.788.videopod.episodes&vd_source=b1e7090f559cd11184bba2cec638592d&p=2",
			"checked": false
		},
		{
			"id": "11",
			"project": "Learning Week1",
			"parent": "14",
			"text": "Introduction to Agent Skills \u{1F4D3} \nhttps://www.bilibili.com/video/BV1qv6eBZErD/?spm_id_from=333.337.search-card.all.click&vd_source=b1e7090f559cd11184bba2cec638592d",
			"checked": false
		},
		{
			"id": "12",
			"project": "Learning Week1",
			"parent": "14",
			"text": "Why Use Skills-1 \u{1F4D3} \nhttps://www.bilibili.com/video/BV1qv6eBZErD?spm_id_from=333.788.videopod.episodes&vd_source=b1e7090f559cd11184bba2cec638592d&p=2",
			"checked": false
		},
        {
        	"id": "13",
        	"project": "Learning Week1",
			"parent": "14",
        	"text": "Why Use Skills-2 \u{1F4D3} \nhttps://www.bilibili.com/video/BV1qv6eBZErD?spm_id_from=333.788.videopod.episodes&vd_source=b1e7090f559cd11184bba2cec638592d&p=3",
        	"checked": false
        },
		
		{
			"id": "15",
			"project": "Learning Week1",
			"text": "Agent Skills Background\u{1F4F9} \nRelative Information and Background knowledge",
			"assigned": [ "user_2", "user_1", "user_3", "user_4"],
			"due_date": "2026-02-13T00:00:00.000Z",

		},
		{
			"id": "14",
			"project": "Learning Week1",
			"text": "Agent Skills\u{1F4F9} \n Watch the video and start your journey.",
			"assigned": [ "user_2", "user_1", "user_3", "user_4"],
			"due_date": "2026-02-13T00:00:00.000Z",
		},
		{
			"id": "15",
			"project": "Learning Week2",
			"text": "Agent Skills\u{1F4F9} \n https://www.bilibili.com/video/BV1qv6eBZErD?spm_id_from=333.788.videopod.episodes&vd_source=b1e7090f559cd11184bba2cec638592d&p=4",
			"assigned": [ "user_2", "user_1", "user_3", "user_4"],
			"due_date": "2026-02-20T00:00:00.000Z",		
		},
		{
			"id": "16",
			"project": "Learning Week2",
			"text": "Agent Skills\u{1F4F9} \n https://www.bilibili.com/video/BV1qv6eBZErD?spm_id_from=333.788.videopod.episodes&vd_source=b1e7090f559cd11184bba2cec638592d&p=5",
			"assigned": [ "user_2", "user_1", "user_3", "user_4"],
			"due_date": "2026-02-20T00:00:00.000Z",		
		}
    ];

    // data for users
	const users = [
		{ "id": "user_3", "label": "Shi suhuan", "avatar": "./Shi.jpg" },
        { "id": "user_1", "label": "Dong haixuan", "avatar": "./Dong.jpg" },
        { "id": "user_2", "label": "Zhang yuehan", "avatar": "./Zhang.jpg" },
		{ "id": "user_4", "label": "Liu fuxuan", "avatar": "./Liu.jpg" },
        // more user objects
    ];

    // data for projects
    const projects = [
		{ "id": "introduction", "label": "Introduction to CISCN-2026 teamwork proactive" },
        { "id": "Learning Week1", "label": "Learning Week1\u{1F929}: Agentic AI and Agent Skills Introduction" },
        { "id": "Learning Week2", "label": "Learning Week2\u{1F914}: " },
		{ "id": "Learning Week3", "label": "Learning Week3\u{1F914}: " },
        // more project objects
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