import {
  Component,
  Directive,
  NgModule,
  Input,
  ViewContainerRef,
  Compiler,
  ComponentFactory,
  ModuleWithComponentFactories,
  ComponentRef,
  ReflectiveInjector
} from '@angular/core';

import { RouterModule }  from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ng2-bootstrap/accordion';


export function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent {};
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({ imports: [CommonModule, RouterModule,AccordionModule.forRoot()], declarations: [decoratedCmp] })
    class DynamicHtmlModule { }

    return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
       .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
        return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
      });
}



@Directive({ selector: 'html-outlet' })
export class HtmlOutletDirective {
  @Input() html: string;
  cmpRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) { }

  ngOnChanges() {
    const html = this.html;
    if (!html) return;
    
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }
    
    const compMetadata = new Component({
        selector: 'dynamic-html',
        template: this.html,
    });

    createComponentFactory(this.compiler, compMetadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);   
        this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
      });
  }
  
  ngOnDestroy() {
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }    
  }
}