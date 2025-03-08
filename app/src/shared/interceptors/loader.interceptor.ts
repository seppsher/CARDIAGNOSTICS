import { inject } from '@angular/core';
import {
	HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, EMPTY, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loaderInterceptor: HttpInterceptorFn = (request, next) => {
  const loadingService = inject(LoadingService);

  loadingService.showLoader();

	return next(request).pipe(
		finalize(() => {
			loadingService.hideLoader();
		}),
		catchError(() => {
			loadingService.hideLoader();
			return EMPTY;
		})
	);
};
