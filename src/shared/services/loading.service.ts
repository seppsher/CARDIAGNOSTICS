import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
	private _isLoading = signal<boolean>(false);

	showLoader(): void {
		this._isLoading.set(true);
	}

	hideLoader(): void {
		this._isLoading.set(false);
	}

	isLoading(): boolean {
		return this._isLoading();
	}
}