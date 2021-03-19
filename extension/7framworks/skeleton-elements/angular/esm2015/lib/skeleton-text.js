import { Directive, Input } from '@angular/core';
export class SkeletonTextDirective {
    constructor() { }
}
SkeletonTextDirective.decorators = [
    { type: Directive, args: [{
                selector: '[skeleton-text]',
                host: {
                    class: 'skeleton-text',
                    '[class.skeleton-effect-fade]': 'effect === "fade"',
                    '[class.skeleton-effect-pulse]': 'effect === "pulse"',
                    '[class.skeleton-effect-wave]': 'effect === "blink" || effect === "wave"',
                },
            },] }
];
SkeletonTextDirective.ctorParameters = () => [];
SkeletonTextDirective.propDecorators = {
    effect: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24tdGV4dC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdmxhZGltaXJraGFybGFtcGlkaS9HaXRIdWIvc2tlbGV0b24tZWxlbWVudHMvc3JjL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvc2tlbGV0b24tdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVdqRCxNQUFNLE9BQU8scUJBQXFCO0lBR2hDLGdCQUFlLENBQUM7OztZQVpqQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxlQUFlO29CQUN0Qiw4QkFBOEIsRUFBRSxtQkFBbUI7b0JBQ25ELCtCQUErQixFQUFFLG9CQUFvQjtvQkFDckQsOEJBQThCLEVBQUUseUNBQXlDO2lCQUMxRTthQUNGOzs7O3FCQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTa2VsZXRvbkVmZmVjdHMgfSBmcm9tICcuL3NrZWxldG9uRWZmZWN0JztcbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tza2VsZXRvbi10ZXh0XScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3NrZWxldG9uLXRleHQnLFxuICAgICdbY2xhc3Muc2tlbGV0b24tZWZmZWN0LWZhZGVdJzogJ2VmZmVjdCA9PT0gXCJmYWRlXCInLFxuICAgICdbY2xhc3Muc2tlbGV0b24tZWZmZWN0LXB1bHNlXSc6ICdlZmZlY3QgPT09IFwicHVsc2VcIicsXG4gICAgJ1tjbGFzcy5za2VsZXRvbi1lZmZlY3Qtd2F2ZV0nOiAnZWZmZWN0ID09PSBcImJsaW5rXCIgfHwgZWZmZWN0ID09PSBcIndhdmVcIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFNrZWxldG9uVGV4dERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGVmZmVjdDogU2tlbGV0b25FZmZlY3RzO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==