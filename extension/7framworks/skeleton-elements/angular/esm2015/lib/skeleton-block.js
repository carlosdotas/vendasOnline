import { Component, Input } from '@angular/core';
export class SkeletonBlockComponent {
}
SkeletonBlockComponent.decorators = [
    { type: Component, args: [{
                selector: 'skeleton-block',
                template: `<ng-content></ng-content>`,
                host: {
                    class: 'skeleton-block',
                    '[class.skeleton-effect-fade]': 'effect === "fade"',
                    '[class.skeleton-effect-pulse]': 'effect === "pulse"',
                    '[class.skeleton-effect-wave]': 'effect === "blink" || effect === "wave"',
                    '[style.width]': 'width',
                    '[style.height]': 'height',
                    '[style.border-radius]': 'borderRadius',
                }
            },] }
];
SkeletonBlockComponent.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }],
    effect: [{ type: Input }],
    borderRadius: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24tYmxvY2suanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3ZsYWRpbWlya2hhcmxhbXBpZGkvR2l0SHViL3NrZWxldG9uLWVsZW1lbnRzL3NyYy9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL3NrZWxldG9uLWJsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBZWpELE1BQU0sT0FBTyxzQkFBc0I7OztZQWJsQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLDhCQUE4QixFQUFFLG1CQUFtQjtvQkFDbkQsK0JBQStCLEVBQUUsb0JBQW9CO29CQUNyRCw4QkFBOEIsRUFBRSx5Q0FBeUM7b0JBQ3pFLGVBQWUsRUFBRSxPQUFPO29CQUN4QixnQkFBZ0IsRUFBRSxRQUFRO29CQUMxQix1QkFBdUIsRUFBRSxjQUFjO2lCQUN4QzthQUNGOzs7b0JBRUUsS0FBSztxQkFDTCxLQUFLO3FCQUNMLEtBQUs7MkJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNrZWxldG9uRWZmZWN0cyB9IGZyb20gJy4vc2tlbGV0b25FZmZlY3QnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2tlbGV0b24tYmxvY2snLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdza2VsZXRvbi1ibG9jaycsXG4gICAgJ1tjbGFzcy5za2VsZXRvbi1lZmZlY3QtZmFkZV0nOiAnZWZmZWN0ID09PSBcImZhZGVcIicsXG4gICAgJ1tjbGFzcy5za2VsZXRvbi1lZmZlY3QtcHVsc2VdJzogJ2VmZmVjdCA9PT0gXCJwdWxzZVwiJyxcbiAgICAnW2NsYXNzLnNrZWxldG9uLWVmZmVjdC13YXZlXSc6ICdlZmZlY3QgPT09IFwiYmxpbmtcIiB8fCBlZmZlY3QgPT09IFwid2F2ZVwiJyxcbiAgICAnW3N0eWxlLndpZHRoXSc6ICd3aWR0aCcsXG4gICAgJ1tzdHlsZS5oZWlnaHRdJzogJ2hlaWdodCcsXG4gICAgJ1tzdHlsZS5ib3JkZXItcmFkaXVzXSc6ICdib3JkZXJSYWRpdXMnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBTa2VsZXRvbkJsb2NrQ29tcG9uZW50IHtcbiAgQElucHV0KCkgd2lkdGg6IHN0cmluZztcbiAgQElucHV0KCkgaGVpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVmZmVjdDogU2tlbGV0b25FZmZlY3RzO1xuICBASW5wdXQoKSBib3JkZXJSYWRpdXM6IHN0cmluZztcbn1cbiJdfQ==