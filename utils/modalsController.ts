
export type ModalsControllerType = {
    openConnectWalletModal: () => void;
    openCreateTaskModal: () => void;
    closeCreateTaskModal: () => void;
}

export class ModalsController {

    private static _controller: ModalsControllerType = {} as any;

    static get controller() {
        return this._controller;
    }

    static setController(controller: Partial<Record<keyof ModalsControllerType, () => void>>) {
        this._controller = { ...this._controller, ...controller }
    }
}
