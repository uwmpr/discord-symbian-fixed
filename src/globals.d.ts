type QSignal<T = void> = {
    disconnect(slot: (arg1: T) => void): void
    connect(slot: (arg1: T) => void): void
};
interface Socket {
    connectToServer(host: string, port: number): void
    send(payload: string): void
    disconnectFromServer(): void

    messageReceived: QSignal<string>
    errors: QSignal<string>
}

interface AvkonHelper {
    minimize(): void
    showPopup(title: string, message: string): void
    clearAllNot(): void
}

interface HttpClient {
    request(method: string, path: string, auth: string, body: string): void
    requestFinished: QSignal<string>
}
interface SendFile {
    sendFile(token: string, channel_id: string, sendProxy: string): void

}

interface QmlApplicationViewer {
    hide(): void
    show(): void
    showMinimized(): void
}

declare namespace Qt {
    type TransactionResult<T = unknown> = {
        insertId: string
        rowsAffected: number
        rows: {
            length: number
            item(i: number): T
        }
    };
    type Transaction = {
        executeSql<T = unknown>(statement: string, values?: unknown[]): TransactionResult<T>
    };
    type Database = {
        transaction(callback: (tx: Transaction) => void): void
        readTransaction(callback: (tx: Transaction) => void): void
    };
    declare function createComponent(url: string): Qml.Component;
    declare function createQmlObject<T = unknown>(qml: string, parent?: unknown): T;
    declare function formatDateTime(date: Date, format: string): string;
    declare function include(filename: string): { status: number };
    declare function resolvedUrl(url: string): string;
    declare function quit(): void;
}

declare namespace Qml {
    interface Component {
        onCompleted: QSignal
        onDestroyed: QSignal
        createObject(parent: Component): void
    }

    interface Page extends Component {
        pageName: string
    }

    interface InfoBanner {
        iconSource: string
        interactive: boolean
        platformInverted: boolean
        text: string
        timeout: number

        close(): void
        open(): void
    }

    interface Dialog {
        accept(): void
        close(): void
        open(): void
        reject(): void
    }

    interface CommonDialog extends Dialog {
        buttonClicked: QSignal<number>
        titleText: string
    }

    interface ToolButton {
        clicked: QSignal
    }

    interface TextField {
        placeholderText: string
        text: string
    }

    interface TextArea {
        implicitHeightChanged: QSignal
        text: string
        placeholderText: string
    }

    interface TextEdit {
        implicitHeightChanged: QSignal
        text: string
        textChanged: QSignal<string>
    }

    interface PageStack {
        depth: number

        push(page: string, properties?: Record<string, unknown>, immediate?: boolean): Qml.Page
        pop(): void
    }

    interface Window extends Component {
        width: number
    }

    interface PageStackWindow extends Window {
        initialPage: Qml.Page
        pageStack: PageStack
    }

    interface ListModel<T = unknown> {
        setProperty(index: number, prop: string, value: T): void
        remove(index: number): void
        get(index: number): void
        append(value: T): void
        clear(): void
    }

    interface ListItem {
        clicked: QSignal
    }

    interface SelectionListItem extends ListItem {
        title: string
        subTitle: string
    }

    interface ListView {
        count: number
        positionViewAtIndex(index: number, mode: number): void
    }

    interface Timer {
        interval: number
        repeat: boolean

        start(): void
        restart(): void
        stop(): void

        triggered: QSignal
    }

    interface Symbian {
        foreground: boolean
        foregroundChanged: QSignal<boolean>
    }

    interface HapticsEffect {
        running: boolean
    }

    interface Menu {
        open(): void
    }
}

declare function openDatabaseSync(
    identifier: string,
    version: string,
    description: string,
    estimatedSize: number,
    callback?: (db: Qt.Database) => void
): Database;

declare interface Window extends Qml.Component, Qml.PageStackWindow {
    client: import("./js/client/Client").Client
    store: import("./js/store/DatabaseStore").DatabaseStore
}

const avkon: AvkonHelper;
const socket: Socket;
const http: HttpClient;
const viewer: QmlApplicationViewer;
const sendfile: SendFile;


const ListView: {
    Beginning: number
    Center: number
    End: number
    Visible: number
    Contain: number
};