import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { ListsResolver } from './_resolvers/lists.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: '*', component: MemberListComponent, resolve: {users: MemberListResolver}},
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
            { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
            { path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            { path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
            { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
            { path: 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Moderator']}},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];
