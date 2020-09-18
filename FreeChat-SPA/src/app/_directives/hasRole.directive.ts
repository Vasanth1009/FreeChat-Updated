import { AuthService } from 'src/app/_services/auth.service';
import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
  @Input() appHasRole: string[];
  isVisible = false;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private authService: AuthService) { }

  ngOnInit() {
    const userRoles = this.authService.decodedToken.role as Array<string>;

    if(!userRoles) {
      this.viewContainerRef.clear();
    }

    if (this.authService.roleMatch(this.appHasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }
}
