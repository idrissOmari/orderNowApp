package fr.omatech.ordernow.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import fr.omatech.ordernow.domain.enumeration.TableStatus;

/**
 * A RestaurantTable.
 */
@Entity
@Table(name = "restaurant_table")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RestaurantTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "t_number")
    private Integer tNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "t_status")
    private TableStatus tStatus;

    @ManyToOne
    @JsonIgnoreProperties("listTables")
    private Restaurant restaurant;

    @ManyToOne
    @JsonIgnoreProperties("listTables")
    private Order order;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer gettNumber() {
        return tNumber;
    }

    public RestaurantTable tNumber(Integer tNumber) {
        this.tNumber = tNumber;
        return this;
    }

    public void settNumber(Integer tNumber) {
        this.tNumber = tNumber;
    }

    public TableStatus gettStatus() {
        return tStatus;
    }

    public RestaurantTable tStatus(TableStatus tStatus) {
        this.tStatus = tStatus;
        return this;
    }

    public void settStatus(TableStatus tStatus) {
        this.tStatus = tStatus;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public RestaurantTable restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Order getOrder() {
        return order;
    }

    public RestaurantTable order(Order order) {
        this.order = order;
        return this;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RestaurantTable)) {
            return false;
        }
        return id != null && id.equals(((RestaurantTable) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RestaurantTable{" +
            "id=" + getId() +
            ", tNumber=" + gettNumber() +
            ", tStatus='" + gettStatus() + "'" +
            "}";
    }
}
