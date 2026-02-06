declare namespace todo{
type TDataBlock = {
    in: string[];
    out: string[];
    exec: any;
    length?: number;
};
type TDataConfig = TDataBlock[];
type TID = number | string;
type TDispatch$1<T> = <A extends keyof T>(action: A, data: T[A]) => void;
interface DataHash {
    [key: string]: any;
}
interface IWritable<T> {
    subscribe: (fn: (v: T) => any) => any;
    update: (fn: (v: T) => any) => any;
    set: (val: T) => any;
}
type TWritableCreator = (val: any) => IWritable<typeof val>;

type TState<Type> = {
    [Property in keyof Type]: IWritable<Type[Property]>;
};
class Store<T extends DataHash> {
    private _state;
    private _values;
    private _writable;
    constructor(writable: TWritableCreator);
    setState(data: Partial<T>): void;
    getState(): T;
    getReactive(): TState<T>;
    private _wrapWritable;
}

class EventBus<T> {
    private _handlers;
    protected _nextHandler: TDispatch$1<T>;
    constructor();
    on(name: string, handler: any): void;
    exec(name: string, ev: any): void;
    setNext(next: TDispatch$1<T>): void;
}

const uid: () => number;

type TDispatch = <A extends keyof THandlersConfig>(action: A, data: THandlersConfig[A]) => void;
type TSubTaskCounter = "percentage" | "number";
type TItemType = "task" | "project";
type TMenuType = "task" | "user" | "toolbar";
type TDropPosition = "top" | "bottom" | "in";
type TDragMode = "copy" | "move";
type TSortDir = "asc" | "desc";
interface IApi {
    exec: <K extends keyof THandlersConfig>(event: K, data: THandlersConfig[K]) => void;
    on: <K extends keyof THandlersConfig>(event: K, callback: (config: THandlersConfig[K]) => any) => void;
    intercept: <K extends keyof THandlersConfig>(event: K, callback: (config: THandlersConfig[K]) => any) => void;
    getState: () => IDataStoreState;
    getReactiveState: () => any;
    setNext: (ev: IEventBus) => void;
    getStores: () => {
        state: DataStore;
    };
    getSelection: (obj?: {
        sorted: boolean;
    }) => TID[];
    eachSelected: (callback: (id: TID, index: number) => void, sorted?: boolean, reversed?: boolean) => void;
    serialize: () => IToDoData;
    parse: (obj: IToDoData) => void;
    existsTask: (obj: {
        id: TID;
    }) => boolean;
    existsProject: (obj: {
        id: TID;
    }) => boolean;
    getTask: (obj: {
        id: TID;
    }) => ITaskItem;
    getProject: (obj: {
        id: TID;
    }) => IProjectItem;
    hasChildren: (obj: {
        id: TID;
        filtered?: boolean;
        hideCompleted?: boolean;
    }) => boolean;
    getChildrenIds: (obj: {
        id: TID;
        filtered?: boolean;
        hideCompleted?: boolean;
        tree?: boolean;
    }) => TID[];
    getParentIds: (obj: {
        id: TID;
    }) => TID[];
    undo: () => void;
    redo: () => void;
}
interface IEventBus {
    exec(name: string, ev: any): void;
    setNext(next: TDispatch): void;
}
interface IHistoryConfig {
    ev: THandlersConfig[keyof THandlersConfig];
    key: keyof THandlersConfig;
    undo: () => void;
    branchId?: TID;
}
interface IHistory {
    undo: (IHistoryConfig | number)[];
    redo: (Omit<IHistoryConfig, "undo"> | number)[];
    batches: Record<number, IHistoryConfig[]>;
}
interface IHistorySetting {
    limit?: number;
    projects?: boolean;
}
interface IComponentConfig {
    id?: TID;
    tasks?: ITaskItem[];
    users?: IUserItem[];
    projects?: IProjectItem[];
    tags?: string[];
    selected?: TID[];
    activeProject?: TID | null;
    readonly?: boolean;
    taskShape?: ITaskShape;
    drag?: IDragConfig | boolean;
    priorities?: IPriorityItem[];
    menu?: boolean | TMenuItemsFn<IGetOptionsConfig>;
    history?: boolean | IHistorySetting;
}
interface IDataStoreState {
    id: TID;
    tasks: ITaskItem[];
    users: IUserItem[];
    projects: IProjectItem[];
    tags: string[];
    selected: TID[];
    activeProject: TID | null;
    readonly: boolean;
    taskShape: ITaskShape;
    drag: IDragConfig;
    priorities?: IPriorityItem[];
    menu?: boolean | TMenuItemsFn<IGetOptionsConfig>;
    treeTasks: ITaskTreeItem[];
    filter: IFilterConfig | null;
    copiedTasksId: TID[];
    defaultTags: string[];
    tasksMap: ITasksMap | null;
    usersMap: IUsersMap | null;
    priorityMap: IPriorityMap | null;
    childrenMap: {
        [key: TID]: ITaskTreeItem[];
    } | null;
    filteredChildrenMap: {
        [key: TID]: ITaskTreeItem[];
    } | null;
    stateEditableItem: IStateEditableItem | null;
    stateSearch: IStateSearch;
    stateDueDate: IStateDueDate;
    stateCombo: IStateCombo;
    draggableIds: TID[];
    dragInfo: IDragInfo | null;
    menuState: IMenuConfig;
    historyState: IHistory;
}
interface IStoreConfig {
    history?: boolean | IHistorySetting;
}
interface IDragInfo {
    start?: TID;
    target?: TID | null;
    dropPosition?: TDropPosition | null;
    mode: TDragMode;
}
interface ITaskShape {
    counter?: {
        type: TSubTaskCounter;
    };
    date?: {
        format: string;
        validate: boolean;
    };
    completed?: {
        behavior: "manual" | "auto";
        taskHide: boolean;
    };
    priority?: {
        cover?: boolean;
        label?: boolean;
    };
}
interface IDragConfig {
    expand?: boolean;
}
interface ITaskItem {
    id?: TID;
    parent?: TID | null;
    project?: TID | null;
    text?: string;
    checked?: boolean;
    collapsed?: boolean;
    assigned?: TID[];
    priority?: number | null;
    due_date?: Date | string;
    creation_date?: Date | string;
    completion_date?: Date | string;
    edited_date?: Date | string;
    selected?: boolean;
    draggable?: boolean;
    [key: string]: any;
}
interface IPriorityItem {
    id: number;
    label: string;
    color?: string;
    hotkey?: string;
}
interface IProjectItem {
    id: TID | null;
    label: string;
}
interface IUserItem {
    id: TID;
    label: string;
    avatar?: string;
    color?: string;
    type?: "user";
}
interface ITaskTreeItem extends ITaskItem {
    children?: ITaskTreeItem[];
    counter?: ISubTaskCounter;
    availableUsers?: IUserItem[];
}
interface IStateEditableItem {
    id: TID;
    type?: TItemType;
    initValue?: string;
    currentValue?: string;
    targetDate?: string;
    dropdown?: {
        type: "menu" | "datepicker";
        coords: ICoords;
        options?: any[];
    };
}
interface ISubTaskCounter {
    total: number;
    done: number;
    type: TSubTaskCounter;
}
interface IGetOptionsConfig {
    store: DataStore;
    type: TMenuType;
    id?: TID;
    source?: TID[];
}
interface IMenuItem {
    id: TID;
    type?: string;
    icon?: string;
    label?: string;
    hotkey?: string;
    value?: any;
    data?: IMenuItem[];
}
type TMenuItemsFn<T> = (type: T) => IMenuItem[] | null | boolean;
interface IMenuConfig {
    id: TID;
    type: TMenuType;
    source: TID[];
    options?: IMenuItem[];
}
interface ICoords {
    x: number;
    y: number;
}
interface IUsersMap {
    [id: string]: IUserItem;
}
interface ITasksMap {
    [id: TID]: ITaskItem;
}
interface IPriorityMap {
    [id: string]: IPriorityItem;
}
interface IFilterConfig {
    match: string | null;
    by?: string;
    highlight?: boolean;
    strict?: boolean;
}
interface ISortConfig {
    by?: string | ((task: ITaskItem | ITaskTreeItem) => string);
    dir?: TSortDir;
    tree?: boolean;
}
interface IStateSearch {
    value: string;
    open?: boolean;
    dropdown?: {
        open: boolean;
        options?: string[];
    };
    focus?: boolean;
}
interface IStateDueDate {
    id: TID;
    open: boolean;
}
interface IStateCombo {
    open: boolean;
}
type TItemTemplate = (config: Record<string, any>) => void[];
interface IToolbarItem {
    type?: string;
    template?: TItemTemplate;
}
interface IToDoData {
    tasks?: IComponentConfig["tasks"];
    users?: IComponentConfig["users"];
    projects?: IComponentConfig["projects"];
    tags?: IComponentConfig["tags"];
    priorities?: IComponentConfig["priorities"];
    activeProject?: IComponentConfig["activeProject"];
}
type CombineTypes<T, N> = {
    [P in keyof T]: T[P] extends Record<any, any> ? T[P] & N : (T[P] & N) | null;
};

class DataStore extends Store<IDataStoreState> {
    in: EventBus<THandlersConfig>;
    out: EventBus<THandlersConfig>;
    config: IStoreConfig;
    private _router;
    constructor(writable: TWritableCreator, config?: IStoreConfig);
    init(initialState: Partial<IDataStoreState>): void;
    undo(): void;
    redo(): void;
    private _findLastChange;
    setState(state: Partial<IDataStoreState>, ctx?: TDataConfig): void;
    getSelection({ sorted }?: {
        sorted?: boolean;
    }): TID[];
    eachSelected(callback: (id: TID, index: number) => void, sorted?: boolean, reversed?: boolean): void;
    serialize(): IToDoData;
    parse(obj: IToDoData): void;
    existsTask(id: TID): boolean;
    existsProject(id: TID): boolean;
    updateTask(ev: THandlersConfig["update-task"]): ITaskItem;
    moveTask({ id, project, parent, targetId, reverse, silent, }: {
        id: TID;
        project?: TID | null;
        parent?: TID | null;
        targetId?: TID;
        reverse?: boolean;
        silent?: boolean;
        operation?: string;
    }): ITaskItem | null;
    pasteTask({ targetId, parent, project, reverse, }: THandlersConfig["paste-task"]): TID[];
    getTask(id: TID): ITaskItem;
    getProject(id: TID): IProjectItem;
    getChildren({ id, tree, filtered, hideCompleted, }: {
        id?: TID;
        tree?: boolean;
        filtered?: boolean;
        hideCompleted?: boolean;
    }): ITaskTreeItem[];
    getChildrenIds({ id, tree, filtered, hideCompleted, }: {
        id: TID;
        tree?: boolean;
        filtered?: boolean;
        hideCompleted?: boolean;
    }): TID[];
    getParentIds(id: TID): TID[];
    getTailId(id: TID, filtered?: boolean, hideCompleted?: boolean): TID;
    hasChildren(id: TID, filtered?: boolean, hideCompleted?: boolean): boolean;
    getTreeIndex(id: TID, filtered?: boolean, hideCompleted?: boolean): number;
    getNearId({ id, dir, flat, filtered, hideCompleted, }: {
        id: TID;
        dir?: "prev" | "next";
        flat?: boolean;
        filtered?: boolean;
        hideCompleted?: boolean;
    }): TID;
    getNearProjectId(id: TID): TID | null;
    getInnerState(tasks: ITaskItem[], project: TID | null, sort?: ISortConfig): {
        treeTasks: ITaskTreeItem[];
        childrenMap: {
            [key: TID]: ITaskItem[];
        };
        filteredChildrenMap: {
            [key: TID]: ITaskItem[];
        };
        usersMap: IUsersMap;
        tags: string[];
    };
    private _setTasksMap;
    private _setHandlers;
    protected _initStructure(): void;
    private _getNextId;
    private _getPrevId;
}
type THandlersConfig = CombineTypes<{
    ["add-task"]: {
        id?: TID;
        project?: TID | null;
        parent?: TID | null;
        targetId?: TID;
        task?: ITaskItem;
        reverse?: boolean;
    };
    ["move-task"]: {
        id: TID;
        project?: TID | null;
        parent?: TID | null;
        targetId?: TID;
        reverse?: boolean;
        operation?: string;
        batch?: TID[];
        skipProvider?: boolean;
    };
    ["copy-task"]: {
        id: TID;
        join?: boolean;
        targetId?: TID;
        parent?: TID | null;
        project?: TID | null;
        reverse?: boolean;
    };
    ["paste-task"]: {
        targetId?: TID;
        parent?: TID | null;
        project?: TID | null;
        reverse?: boolean;
    };
    ["update-task"]: {
        id: TID;
        task: ITaskItem;
        skipProvider?: boolean;
        skipStateCalc?: boolean;
        batch?: ITaskItem[];
    };
    ["delete-task"]: {
        id: TID;
        batch?: TID[];
    };
    ["indent-task"]: {
        id: TID;
        batchID?: TID;
    };
    ["unindent-task"]: {
        id: TID;
        batchID?: TID;
    };
    ["check-task"]: {
        id: TID;
        manual?: boolean;
        skipStateCalc?: boolean;
    };
    ["uncheck-task"]: {
        id: TID;
        manual?: boolean;
        skipStateCalc?: boolean;
    };
    ["expand-task"]: {
        id: TID;
    };
    ["collapse-task"]: {
        id: TID;
    };
    ["select-task"]: {
        id: TID;
        join?: boolean;
    };
    ["unselect-task"]: {
        id: TID | null;
    };
    ["show-completed-tasks"]: null;
    ["hide-completed-tasks"]: null;
    ["open-inline-editor"]: {
        id: TID;
        type?: TItemType;
        targetDate?: string | number;
    };
    ["close-inline-editor"]: {
        id?: TID;
        save?: boolean;
    };
    ["assign-user"]: {
        id: TID;
        userId: TID;
    };
    ["unassign-user"]: {
        id: TID;
        userId: TID;
    };
    ["add-project"]: {
        id?: TID;
        project?: IProjectItem;
    };
    ["update-project"]: {
        id: TID;
        project: IProjectItem;
    };
    ["set-project"]: {
        id: TID | null;
    };
    ["delete-project"]: {
        id: TID | null;
    };
    ["set-filter"]: IFilterConfig;
    ["set-sort"]: ISortConfig;
    ["open-menu"]: {
        id: TID;
        type: TMenuType;
        source?: TID[];
        coords?: any;
    };
    ["close-menu"]: {
        id?: TID;
        type: TMenuType;
    };
    ["click-menu-item"]: {
        id: TID;
        type: TMenuType;
        action: string;
        params?: any;
    };
    ["edit-item"]: {
        id: TID;
        currentValue: string;
    };
    ["keypress-on-todo"]: {
        code: string;
        event: KeyboardEvent;
    };
    ["clone-task"]: {
        targetId?: TID;
        parent?: TID | null;
        project?: TID | null;
        reverse?: boolean;
        batch?: ITaskItem[];
    };
    ["start-drag"]: {
        start: TID;
        mode: TDragMode;
    };
    ["drag"]: {
        start: TID;
        source: TID[];
        target: TID | null;
        dropPosition: TDropPosition | null;
    };
    ["end-drag"]: {
        target: TID | null;
        dropPosition: TDropPosition | null;
        mode: TDragMode;
    };
    ["set-state-search"]: IStateSearch;
    ["set-state-due-date"]: IStateDueDate;
    ["set-state-combo"]: IStateCombo;
}, {
    $meta?: {
        skipHistory?: boolean;
        batch?: number;
        restore?: TID;
        branchId?: TID;
    };
}>;

function getMenuOptions({ store, type, id, source }: IGetOptionsConfig): true | any[];

class Events {
    private _api;
    constructor(api: IApi);
    on<K extends keyof THandlersConfig>(event: K, callback: (config: THandlersConfig[K]) => any): void;
    exec<K extends keyof THandlersConfig>(event: K, data: THandlersConfig[K]): void;
}

interface IToDoConfig extends IComponentConfig {
    locale?: Record<string, string>;
}
class ToDo {
    api: IApi;
    events: Events;
    config: IToDoConfig;
    container: HTMLElement | Element;
    private _widget;
    constructor(container: HTMLElement | Element | string, config: IToDoConfig);
    destructor(): void;
    setConfig(config: Partial<IToDoConfig>): void;
    parse(data: IToDoData): void;
    serialize(): IToDoData;
    existsTask(config: {
        id: TID;
    }): boolean;
    existsProject(config: {
        id: TID;
    }): boolean;
    getTask(config: {
        id: TID;
    }): ITaskItem;
    getProject(config: {
        id: TID;
    }): IProjectItem;
    hasChildren(config: {
        id: TID;
        filtered?: boolean;
        hideCompleted?: boolean;
    }): boolean;
    getChildrenIds(config: {
        id: TID;
        filtered?: boolean;
        tree?: boolean;
        hideCompleted?: boolean;
    }): TID[];
    getParentIds(config: {
        id: TID;
    }): TID[];
    setLocale(locale: Record<string, string>): void;
    setFilter(config: THandlersConfig["set-filter"]): void;
    setSort(config: THandlersConfig["set-sort"]): void;
    selectTask(config: THandlersConfig["select-task"]): void;
    unselectTask(config: THandlersConfig["unselect-task"]): void;
    getSelection(obj: {
        sorted: boolean;
    }): TID[];
    eachSelected(callback: (id: TID, index: number) => void, sorted: boolean, reversed: boolean): void;
    addTask(config: THandlersConfig["add-task"]): void;
    copyTask(config: THandlersConfig["copy-task"]): void;
    pasteTask(config: THandlersConfig["paste-task"]): void;
    moveTask(config: THandlersConfig["move-task"]): void;
    updateTask(config: THandlersConfig["update-task"]): void;
    deleteTask(config: THandlersConfig["delete-task"]): void;
    indentTask(config: THandlersConfig["indent-task"]): void;
    unindentTask(config: THandlersConfig["unindent-task"]): void;
    checkTask(config: THandlersConfig["check-task"]): void;
    uncheckTask(config: THandlersConfig["uncheck-task"]): void;
    expandTask(config: THandlersConfig["expand-task"]): void;
    collapseTask(config: THandlersConfig["collapse-task"]): void;
    showCompletedTasks(): void;
    hideCompletedTasks(): void;
    openInlineEditor(config: THandlersConfig["open-inline-editor"]): void;
    closeInlineEditor(config: THandlersConfig["close-inline-editor"]): void;
    assignUser(config: THandlersConfig["assign-user"]): void;
    unassignUser(config: THandlersConfig["unassign-user"]): void;
    addProject(config: THandlersConfig["add-project"]): void;
    updateProject(config: THandlersConfig["update-project"]): void;
    setProject(config: THandlersConfig["set-project"]): void;
    deleteProject(config: THandlersConfig["delete-project"]): void;
    undo(): void;
    redo(): void;
    private _init;
}

interface IToolbarConfig {
    api: IApi;
    items?: string[] | TItemTemplate[] | IToolbarItem[];
    locale?: Record<string, string>;
}
class Toolbar {
    api: IApi;
    events: Events;
    config: IToolbarConfig;
    container: HTMLElement;
    private _toolbar;
    constructor(container: HTMLElement, config: IToolbarConfig);
    destructor(): void;
    setConfig(config: Partial<IToolbarConfig>): void;
    setLocale(locale: Record<string, string>, api: IApi): void;
    private _init;
    private _configToProps;
    private _normalizeItems;
}

class RestDataProvider extends EventBus<THandlersConfig> {
    private _url;
    private _api;
    private _queue;
    private _customHeaders;
    constructor(url?: string, api?: IApi);
    getTasks(): Promise<ITaskItem[]>;
    getProjectTasks(id: TID): Promise<ITaskItem[]>;
    getUsers(): Promise<IUserItem[]>;
    getProjects(): Promise<IProjectItem[]>;
    getTags(): Promise<string[]>;
    setAPI(api: IApi): void;
    setHeaders(headers: any): void;
    getIDResolver(): any;
    protected getHandlers(handlers: Partial<Record<keyof THandlersConfig, any>>): Partial<Record<keyof THandlersConfig, any>>;
    protected send<T>(url: string, method: string, data?: any, customHeaders?: any): Promise<T>;
    protected toArray(data: any[]): any[];
}

class RemoteEvents {
    protected _remote: any;
    protected _ready: Promise<any>;
    constructor(url: string, token: string);
    protected ready(): Promise<any>;
    protected on(name: string | any, handler?: any): void;
}

function todoUpdates(api: any, resolver: any): {
    tasks: (obj: any) => void;
    projects: (obj: any) => void;
};

export { RemoteEvents, RestDataProvider, ToDo, Toolbar, getMenuOptions, todoUpdates, uid };
}