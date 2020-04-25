package fr.omatech.ordernow.service.dto;

import java.io.Serializable;
import java.util.Objects;
import fr.omatech.ordernow.domain.enumeration.TableStatus;

/**
 * A DTO for the {@link fr.omatech.ordernow.domain.RestaurantTable} entity.
 */
public class RestaurantTableDTO implements Serializable {
    
    private Long id;

    private Integer tNumber;

    private TableStatus tStatus;


    private Long restaurantId;

    private Long orderId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer gettNumber() {
        return tNumber;
    }

    public void settNumber(Integer tNumber) {
        this.tNumber = tNumber;
    }

    public TableStatus gettStatus() {
        return tStatus;
    }

    public void settStatus(TableStatus tStatus) {
        this.tStatus = tStatus;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RestaurantTableDTO restaurantTableDTO = (RestaurantTableDTO) o;
        if (restaurantTableDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restaurantTableDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RestaurantTableDTO{" +
            "id=" + getId() +
            ", tNumber=" + gettNumber() +
            ", tStatus='" + gettStatus() + "'" +
            ", restaurantId=" + getRestaurantId() +
            ", orderId=" + getOrderId() +
            "}";
    }
}
