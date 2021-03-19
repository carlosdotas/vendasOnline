import { NgModule } from '@angular/core';
import { SkeletonBlockComponent } from './skeleton-block';
import { SkeletonAvatarComponent } from './skeleton-avatar';
import { CommonModule } from '@angular/common';
import { SkeletonTextDirective } from './skeleton-text';
import { SkeletonImageComponent } from './skeleton-image';
export class SkeletonElementsModule {
}
SkeletonElementsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SkeletonBlockComponent,
                    SkeletonAvatarComponent,
                    SkeletonTextDirective,
                    SkeletonImageComponent,
                ],
                exports: [
                    SkeletonBlockComponent,
                    SkeletonAvatarComponent,
                    SkeletonTextDirective,
                    SkeletonImageComponent,
                ],
                imports: [CommonModule],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24tZWxlbWVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92bGFkaW1pcmtoYXJsYW1waWRpL0dpdEh1Yi9za2VsZXRvbi1lbGVtZW50cy9zcmMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9za2VsZXRvbi1lbGVtZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFpQjFELE1BQU0sT0FBTyxzQkFBc0I7OztZQWZsQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLHNCQUFzQjtvQkFDdEIsdUJBQXVCO29CQUN2QixxQkFBcUI7b0JBQ3JCLHNCQUFzQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtvQkFDdEIsdUJBQXVCO29CQUN2QixxQkFBcUI7b0JBQ3JCLHNCQUFzQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNrZWxldG9uQmxvY2tDb21wb25lbnQgfSBmcm9tICcuL3NrZWxldG9uLWJsb2NrJztcbmltcG9ydCB7IFNrZWxldG9uQXZhdGFyQ29tcG9uZW50IH0gZnJvbSAnLi9za2VsZXRvbi1hdmF0YXInO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNrZWxldG9uVGV4dERpcmVjdGl2ZSB9IGZyb20gJy4vc2tlbGV0b24tdGV4dCc7XG5pbXBvcnQgeyBTa2VsZXRvbkltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9za2VsZXRvbi1pbWFnZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFNrZWxldG9uQmxvY2tDb21wb25lbnQsXG4gICAgU2tlbGV0b25BdmF0YXJDb21wb25lbnQsXG4gICAgU2tlbGV0b25UZXh0RGlyZWN0aXZlLFxuICAgIFNrZWxldG9uSW1hZ2VDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTa2VsZXRvbkJsb2NrQ29tcG9uZW50LFxuICAgIFNrZWxldG9uQXZhdGFyQ29tcG9uZW50LFxuICAgIFNrZWxldG9uVGV4dERpcmVjdGl2ZSxcbiAgICBTa2VsZXRvbkltYWdlQ29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2tlbGV0b25FbGVtZW50c01vZHVsZSB7fVxuIl19