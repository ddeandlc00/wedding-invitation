import PublicSiteController from './PublicSiteController'
import InvitationAccessController from './InvitationAccessController'
import InvitationPageController from './InvitationPageController'
import RsvpSubmissionController from './RsvpSubmissionController'
import Admin from './Admin'
import Settings from './Settings'
const Controllers = {
    PublicSiteController: Object.assign(PublicSiteController, PublicSiteController),
InvitationAccessController: Object.assign(InvitationAccessController, InvitationAccessController),
InvitationPageController: Object.assign(InvitationPageController, InvitationPageController),
RsvpSubmissionController: Object.assign(RsvpSubmissionController, RsvpSubmissionController),
Admin: Object.assign(Admin, Admin),
Settings: Object.assign(Settings, Settings),
}

export default Controllers