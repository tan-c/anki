// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import { CalorieActions } from 'utility-redux/hourblock/calorie';
// import InputNewConnected from 'utility-react-component/Form/Input/New';
// import Input from 'utility-react-component/Form/Input/Uncontrolled';
// import SelectConnected from 'utility-react-component/Form/Select';

// export class CaloriesList extends React.Component {
//   render() {
//     const { calories } = this.props;

//     return (
//       <React.Fragment>
//         <div className="section-header">
//           Calorie Item List
//         </div>
//         <div className="section-content">
//           <div className="list-with-pinned-bottom">
//             {calories.valueSeq().map(calorie => (
//               <div className="flex-container-row typical-setup" key={calorie.get('_id')}>
//                 <span className="flex-3">
//                   <Input
//                     inputName="name"
//                     record={calorie}
//                     actions={this.props.CalorieActions}
//                   />
//                 </span>
//                 <span className="flex-1">
//                   <SelectConnected
//                     onChangeEvent={(event) => {
//                       this.props.CalorieActions.update(calorie.set('type', event.target.value));
//                     }}
//                     value={calorie.get('type')}
//                     options={['main', 'addition', 'snack', 'drink']}
//                   />
//                 </span>
//                 <span className="flex-1">
//                   <Input
//                     inputName="calorie"
//                     record={calorie}
//                     actions={this.props.CalorieActions}
//                   />
//                 </span>
//               </div>))}
//           </div>
//           <div className="flex-container-row pinned-bottom border-top">
//             <InputNewConnected
//               inputName="name"
//               inputClassNames="flex-1"
//               actions={this.props.CalorieActions}
//             />
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// CaloriesList.defaultProps = {
// };

// CaloriesList.propTypes = {
//   calories: PropTypes.object.isRequired,
//   CalorieActions: PropTypes.object.isRequired,
// };

// function mapStateToProps(state, ownProps) {
//   return {
//     calories: state.calories,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     CalorieActions: bindActionCreators(CalorieActions, dispatch),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CaloriesList);
