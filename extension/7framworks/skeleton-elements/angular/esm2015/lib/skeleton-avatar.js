import { Component, Input } from '@angular/core';
import { multiplySvgPointsService } from './multiply-svg-points';
export class SkeletonAvatarComponent {
    constructor() {
        this.size = 48;
        this.showIcon = true;
        this.borderRadius = '50%';
    }
    multiplyPoints(pointsString) {
        return multiplySvgPointsService(pointsString, 56, this.size, this.size);
    }
}
SkeletonAvatarComponent.decorators = [
    { type: Component, args: [{
                selector: 'skeleton-avatar',
                host: {
                    class: 'skeleton-avatar',
                    '[class.skeleton-effect-fade]': 'effect === "fade"',
                    '[class.skeleton-effect-pulse]': 'effect === "pulse"',
                    '[class.skeleton-effect-wave]': 'effect === "blink" || effect === "wave"',
                },
                template: `<svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      [attr.viewBox]="'0 0 ' + size + ' ' + size"
      preserveAspectRatio="none"
    >
      <rect
        [attr.width]="size"
        [attr.height]="size"
        fillRule="evenodd"
        [style.fill]="color"
        [attr.rx]="borderRadius"
      />
      <path
        *ngIf="showIcon"
        [style.fill]="iconColor"
        [attr.d]="
          multiplyPoints(
            'M28.22461,27.1590817 C34.9209931,27.1590817 40.6829044,21.1791004 40.6829044,13.3926332 C40.6829044,5.69958662 34.8898972,0 28.22461,0 C21.5594557,0 15.7663156,5.82423601 15.7663156,13.4549579 C15.7663156,21.1791004 21.5594557,27.1590817 28.22461,27.1590817 Z M8.66515427,56 L47.7841986,56 C52.6739629,56 54.4181241,54.5984253 54.4181241,51.8576005 C54.4181241,43.8219674 44.358068,32.7341519 28.22461,32.7341519 C12.0600561,32.7341519 2,43.8219674 2,51.8576005 C2,54.5984253 3.74402832,56 8.66515427,56 Z'
          )
        "
      />
    </svg>
    <ng-content></ng-content>`
            },] }
];
SkeletonAvatarComponent.propDecorators = {
    size: [{ type: Input }],
    color: [{ type: Input }],
    showIcon: [{ type: Input }],
    iconColor: [{ type: Input }],
    borderRadius: [{ type: Input }],
    effect: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24tYXZhdGFyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92bGFkaW1pcmtoYXJsYW1waWRpL0dpdEh1Yi9za2VsZXRvbi1lbGVtZW50cy9zcmMvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9za2VsZXRvbi1hdmF0YXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFtQ2pFLE1BQU0sT0FBTyx1QkFBdUI7SUFsQ3BDO1FBbUNXLFNBQUksR0FBVyxFQUFFLENBQUM7UUFFbEIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6QixpQkFBWSxHQUFXLEtBQUssQ0FBQztJQU14QyxDQUFDO0lBSEMsY0FBYyxDQUFDLFlBQVk7UUFDekIsT0FBTyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFFLENBQUM7OztZQTVDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxpQkFBaUI7b0JBQ3hCLDhCQUE4QixFQUFFLG1CQUFtQjtvQkFDbkQsK0JBQStCLEVBQUUsb0JBQW9CO29CQUNyRCw4QkFBOEIsRUFBRSx5Q0FBeUM7aUJBQzFFO2dCQUNELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQXdCa0I7YUFDN0I7OzttQkFFRSxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzJCQUNMLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNrZWxldG9uRWZmZWN0cyB9IGZyb20gJy4vc2tlbGV0b25FZmZlY3QnO1xuaW1wb3J0IHsgbXVsdGlwbHlTdmdQb2ludHNTZXJ2aWNlIH0gZnJvbSAnLi9tdWx0aXBseS1zdmctcG9pbnRzJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NrZWxldG9uLWF2YXRhcicsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3NrZWxldG9uLWF2YXRhcicsXG4gICAgJ1tjbGFzcy5za2VsZXRvbi1lZmZlY3QtZmFkZV0nOiAnZWZmZWN0ID09PSBcImZhZGVcIicsXG4gICAgJ1tjbGFzcy5za2VsZXRvbi1lZmZlY3QtcHVsc2VdJzogJ2VmZmVjdCA9PT0gXCJwdWxzZVwiJyxcbiAgICAnW2NsYXNzLnNrZWxldG9uLWVmZmVjdC13YXZlXSc6ICdlZmZlY3QgPT09IFwiYmxpbmtcIiB8fCBlZmZlY3QgPT09IFwid2F2ZVwiJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGA8c3ZnXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgIFthdHRyLndpZHRoXT1cInNpemVcIlxuICAgICAgW2F0dHIuaGVpZ2h0XT1cInNpemVcIlxuICAgICAgW2F0dHIudmlld0JveF09XCInMCAwICcgKyBzaXplICsgJyAnICsgc2l6ZVwiXG4gICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiXG4gICAgPlxuICAgICAgPHJlY3RcbiAgICAgICAgW2F0dHIud2lkdGhdPVwic2l6ZVwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJzaXplXCJcbiAgICAgICAgZmlsbFJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgW3N0eWxlLmZpbGxdPVwiY29sb3JcIlxuICAgICAgICBbYXR0ci5yeF09XCJib3JkZXJSYWRpdXNcIlxuICAgICAgLz5cbiAgICAgIDxwYXRoXG4gICAgICAgICpuZ0lmPVwic2hvd0ljb25cIlxuICAgICAgICBbc3R5bGUuZmlsbF09XCJpY29uQ29sb3JcIlxuICAgICAgICBbYXR0ci5kXT1cIlxuICAgICAgICAgIG11bHRpcGx5UG9pbnRzKFxuICAgICAgICAgICAgJ00yOC4yMjQ2MSwyNy4xNTkwODE3IEMzNC45MjA5OTMxLDI3LjE1OTA4MTcgNDAuNjgyOTA0NCwyMS4xNzkxMDA0IDQwLjY4MjkwNDQsMTMuMzkyNjMzMiBDNDAuNjgyOTA0NCw1LjY5OTU4NjYyIDM0Ljg4OTg5NzIsMCAyOC4yMjQ2MSwwIEMyMS41NTk0NTU3LDAgMTUuNzY2MzE1Niw1LjgyNDIzNjAxIDE1Ljc2NjMxNTYsMTMuNDU0OTU3OSBDMTUuNzY2MzE1NiwyMS4xNzkxMDA0IDIxLjU1OTQ1NTcsMjcuMTU5MDgxNyAyOC4yMjQ2MSwyNy4xNTkwODE3IFogTTguNjY1MTU0MjcsNTYgTDQ3Ljc4NDE5ODYsNTYgQzUyLjY3Mzk2MjksNTYgNTQuNDE4MTI0MSw1NC41OTg0MjUzIDU0LjQxODEyNDEsNTEuODU3NjAwNSBDNTQuNDE4MTI0MSw0My44MjE5Njc0IDQ0LjM1ODA2OCwzMi43MzQxNTE5IDI4LjIyNDYxLDMyLjczNDE1MTkgQzEyLjA2MDA1NjEsMzIuNzM0MTUxOSAyLDQzLjgyMTk2NzQgMiw1MS44NTc2MDA1IEMyLDU0LjU5ODQyNTMgMy43NDQwMjgzMiw1NiA4LjY2NTE1NDI3LDU2IFonXG4gICAgICAgICAgKVxuICAgICAgICBcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbn0pXG5leHBvcnQgY2xhc3MgU2tlbGV0b25BdmF0YXJDb21wb25lbnQge1xuICBASW5wdXQoKSBzaXplOiBudW1iZXIgPSA0ODtcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgc2hvd0ljb246IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBpY29uQ29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgYm9yZGVyUmFkaXVzOiBzdHJpbmcgPSAnNTAlJztcbiAgQElucHV0KCkgZWZmZWN0OiBTa2VsZXRvbkVmZmVjdHM7XG5cbiAgbXVsdGlwbHlQb2ludHMocG9pbnRzU3RyaW5nKSB7XG4gICAgcmV0dXJuIG11bHRpcGx5U3ZnUG9pbnRzU2VydmljZShwb2ludHNTdHJpbmcsIDU2LCB0aGlzLnNpemUsIHRoaXMuc2l6ZSk7XG4gIH1cbn1cbiJdfQ==