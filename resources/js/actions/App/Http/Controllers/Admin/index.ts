import DashboardController from './DashboardController'
import InvitationController from './InvitationController'
import RsvpController from './RsvpController'
import WeddingSettingsController from './WeddingSettingsController'
import ContentController from './ContentController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
InvitationController: Object.assign(InvitationController, InvitationController),
RsvpController: Object.assign(RsvpController, RsvpController),
WeddingSettingsController: Object.assign(WeddingSettingsController, WeddingSettingsController),
ContentController: Object.assign(ContentController, ContentController),
}

export default Admin